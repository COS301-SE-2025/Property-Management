package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "quote_vote_session")
data class QuoteVoteSession(
    @Id
    val sessionUuid: UUID = UUID.randomUUID(),
    @Column(nullable = false)
    val taskUuid: UUID,
    @Column(nullable = false)
    val coporateUuid: UUID,
    @Column(nullable = false)
    val votingEndsAt: LocalDateTime,
)
