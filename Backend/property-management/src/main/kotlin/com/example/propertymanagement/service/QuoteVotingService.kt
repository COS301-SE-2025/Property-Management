package com.example.propertymanagement.service

import com.example.propertymanagement.dto.CreateVoteSessionRequest
import com.example.propertymanagement.dto.QuoteVoteResult
import com.example.propertymanagement.dto.SubmitVoteRequest
import com.example.propertymanagement.dto.VoteSessionResult
import com.example.propertymanagement.exception.RestException
import com.example.propertymanagement.model.Quote
import com.example.propertymanagement.model.QuoteVote
import com.example.propertymanagement.model.QuoteVoteSession
import com.example.propertymanagement.repository.BodyCorporateRepository
import com.example.propertymanagement.repository.QuoteRepository
import com.example.propertymanagement.repository.QuoteVoteRepository
import com.example.propertymanagement.repository.QuoteVoteSessionRepository
import com.example.propertymanagement.repository.TrusteeBodyCorporateInviteRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.LocalDateTime
import java.util.UUID

@Service
class QuoteVotingService(
    private val sessionRepo: QuoteVoteSessionRepository,
    private val voteRepo: QuoteVoteRepository,
    private val quoteRepo: QuoteRepository,
    private val inviteRepo: TrusteeBodyCorporateInviteRepository,
    private val bodycorpRepo: BodyCorporateRepository,
) {
    fun createSession(request: CreateVoteSessionRequest): QuoteVoteSession =
        sessionRepo.save(
            QuoteVoteSession(
                sessionUuid = UUID.randomUUID(),
                taskUuid = request.taskUuid,
                coporateUuid = request.coporateUuid,
                votingEndsAt = LocalDateTime.parse(request.votingEndsAt),
            ),
        )

    fun vote(request: SubmitVoteRequest) {
        val session =
            sessionRepo
                .findById(request.sessionUuid)
                .orElseThrow { RestException(HttpStatus.NOT_FOUND, "Voting session not found") }

        val quote =
            quoteRepo
                .findByUuid(request.quoteUuid)
                .orElseThrow { RestException(HttpStatus.NOT_FOUND, "Quote not found") }

        if (quote.t_uuid != session.taskUuid) {
            throw RestException(HttpStatus.BAD_REQUEST, "Quote does not belong to this session's task")
        }

        if (voteRepo.existsBySessionUuidAndQuoteUuidAndVoterUuid(
                request.sessionUuid,
                request.quoteUuid,
                request.voterUuid,
            )
        ) {
            throw RestException(HttpStatus.BAD_REQUEST, "You already voted for this quote")
        }

        if (request.isTrustee) {
            val isMember =
                inviteRepo.existsByTrusteeUuidAndCoporateUuidAndStatus(
                    trusteeUuid = request.voterUuid,
                    coporateUuid = session.coporateUuid,
                    status = "ACCEPTED",
                )
            if (!isMember) {
                throw RestException(HttpStatus.FORBIDDEN, "You must be a member of the body corporate to vote")
            }
        } else {
            val bc =
                bodycorpRepo.findByCorporateUuid(session.coporateUuid)
                    ?: throw RestException(HttpStatus.NOT_FOUND, "Body corporate not found")
            if (session.coporateUuid != request.voterUuid) {
                throw RestException(HttpStatus.FORBIDDEN, "You are not authorized to vote")
            }
        }

        voteRepo.save(
            QuoteVote(
                sessionUuid = request.sessionUuid,
                quoteUuid = request.quoteUuid,
                voterUuid = request.voterUuid,
                isTrustee = request.isTrustee,
                voteFor = request.voteFor,
            ),
        )
    }

    fun getResults(sessionUuid: UUID): VoteSessionResult {
        val session =
            sessionRepo
                .findById(sessionUuid)
                .orElseThrow { RestException(HttpStatus.NOT_FOUND, "Voting session not found") }

        val quotes: List<Quote> = quoteRepo.findAllByTaskUuid(session.taskUuid)

        val results: List<QuoteVoteResult> =
            quotes.map { q ->
                val quoteUuid = q.uuid ?: throw IllegalStateException("Qoute UUID cannot be null")
                val f =
                    voteRepo
                        .countBySessionUuidAndQuoteUuidAndVoteFor(sessionUuid, quoteUuid, true)
                        .toInt()
                val a =
                    voteRepo
                        .countBySessionUuidAndQuoteUuidAndVoteFor(sessionUuid, quoteUuid, false)
                        .toInt()
                QuoteVoteResult(
                    quoteUuid = quoteUuid,
                    votesFor = f,
                    votesAgainst = a,
                )
            }

        val ended = session.votingEndsAt.isBefore(LocalDateTime.now())
        val winner = if (ended) determineWinner(results, quotes) else null

        return VoteSessionResult(
            sessionUuid = session.sessionUuid,
            taskUuid = session.taskUuid,
            results = results,
            votingEnded = ended,
            winningQuoteUuid = winner,
        )
    }

    private fun determineWinner(
        results: List<QuoteVoteResult>,
        quotes: List<Quote>,
    ): UUID? {
        return results
            .mapNotNull { r ->
                val q = quotes.find { it.uuid == r.quoteUuid } ?: return@mapNotNull null
                val net = r.votesFor - r.votesAgainst
                Triple(r.quoteUuid, net, q.submitted_on.toInstant())
            }.sortedWith(
                compareByDescending<Triple<UUID, Int, Instant>> { it.second }
                    .thenBy { it.third },
            ).firstOrNull()
            ?.first
    }
}
