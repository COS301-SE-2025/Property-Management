package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.util.Date

@Entity
@Table(name = "quote")
data class Quote(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    val amount: BigDecimal,
    @Column(name = "document_url")
    val doc: String,
    @Column(name = "submitted_on", nullable = false)
    val submitted_on: Date,
    @Column(name = "status", nullable = false)
    val status: String,
    @Column(name = "quote_uuid")
    val uuid: UUID = UUID.randomUUID(),
    @Column(name = "task_uuid")
    val t_uuid: UUID,
    @Column(name = "contractor_uuid")
    val c_uuid: UUID,
)
