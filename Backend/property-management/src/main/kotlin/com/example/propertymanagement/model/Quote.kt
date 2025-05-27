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
    @Column(name = "quote_id")
    val quote_id: Int = 0,
    @Column(name = "task_id", nullable = true)
    val task_id: Int,
    @Column(name = "contractor_id", nullable = true)
    val contractor_id: Int,
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    val amount: BigDecimal,
    @Column(name = "submitted_on", nullable = false)
    val submitted_on: Date,
    @Column(name = "type", nullable = false)
    val type: String,
)
