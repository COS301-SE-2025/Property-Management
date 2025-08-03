package com.example.propertymanagement.repository

import com.example.propertymanagement.model.QuoteVoteSession
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface QuoteVoteSessionRepository : JpaRepository<QuoteVoteSession, UUID> {
    fun findBySessionUuid(sessionUuid: UUID): QuoteVoteSession?

    fun deleteBySessionUuid(sessionUuid: UUID)
}
