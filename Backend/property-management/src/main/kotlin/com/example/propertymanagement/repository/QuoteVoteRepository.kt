package com.example.propertymanagement.repository

import com.example.propertymanagement.model.QuoteVote
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface QuoteVoteRepository : JpaRepository<QuoteVote, UUID> {
    fun existsBySessionUuidAndQuoteUuidAndVoterUuid(
        sessionUuid: UUID,
        quoteUuid: UUID,
        voterUuid: UUID,
    ): Boolean

    fun countBySessionUuidAndQuoteUuidAndVoteFor(
        sessionUuid: UUID,
        quoteUuid: UUID,
        voteFor: Boolean,
    ): Long
}
