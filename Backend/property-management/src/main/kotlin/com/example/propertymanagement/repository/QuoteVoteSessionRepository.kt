package com.example.propertymanagement.repository

import com.example.propertymanagement.model.QuoteVoteSession
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID
import java.util.Optional

interface QuoteVoteSessionRepository : JpaRepository<QuoteVoteSession, UUID> {
    fun findBySessionUuid(sessionUuid: UUID): QuoteVoteSession?

    fun deleteBySessionUuid(sessionUuid: UUID)

    fun findByTaskUuid(taskUuid: UUID): Optional<QuoteVoteSession>
}
