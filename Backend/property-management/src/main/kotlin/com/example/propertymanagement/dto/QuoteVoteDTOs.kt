package com.example.propertymanagement.dto

import java.util.UUID

data class CreateVoteSessionRequest(
    val coporateUuid: UUID,
    val taskUuid: UUID,
    val votingEndsAt: String,
)

data class SubmitVoteRequest(
    val sessionUuid: UUID,
    val quoteUuid: UUID,
    val voterUuid: UUID,
    val isTrustee: Boolean,
    val voteFor: Boolean,
)

data class QuoteVoteResult(
    val quoteUuid: UUID,
    val votesFor: Int,
    val votesAgainst: Int,
)

data class VoteSessionResult(
    val sessionUuid: UUID,
    val taskUuid: UUID,
    val results: List<QuoteVoteResult>,
    val votingEnded: Boolean,
    val winningQuoteUuid: UUID?,
)
