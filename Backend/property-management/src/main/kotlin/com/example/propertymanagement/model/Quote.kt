package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.util.Date
import java.util.UUID

@Entity
@Table(name = "quote")
data class Quote(
    @Id
    @Column(name = "quote_uuid", nullable = false, unique = true)
    val uuid: UUID = UUID.randomUUID(),
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    val amount: BigDecimal? = null,
    @Column(name = "document_url")
    val doc: String? = null,
    @Column(name = "submitted_on", nullable = false)
    val submitted_on: Date,
    @Column(name = "status", nullable = false)
    val status: String? = null,
    @Column(name = "task_uuid")
    val t_uuid: UUID? = null,
    @Column(name = "contractor_uuid")
    val c_uuid: UUID? = null,
    @Column(name = "expiry_date", nullable = false)
    val expiry_date: Date,
)
