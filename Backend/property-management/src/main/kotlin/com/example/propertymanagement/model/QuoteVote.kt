package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "quote_vote")
data class QuoteVote(
    @Id
    val voteUuid: UUID = UUID.randomUUID(),
    @Column(nullable = false)
    val sessionUuid: UUID,
    @Column(nullable = false)
    val quoteUuid: UUID,
    @Column(nullable = false)
    val voterUuid: UUID,
    @Column(nullable = false)
    val isTrustee: Boolean,
    @Column(nullable = false)
    val voteFor: Boolean,
    @Column(nullable = false)
    val votedOn: LocalDateTime = LocalDateTime.now(),
)
