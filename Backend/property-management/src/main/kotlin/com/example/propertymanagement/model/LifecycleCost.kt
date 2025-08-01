package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.util.UUID

@Entity
@Table(name = "lifecycle_cost")
data class LifecycleCost(
    @Id
    @Column(name = "cost_uuid", columnDefinition = "uuid")
    val costUuid: UUID = UUID.randomUUID(),
    @Column(name = "coporate_uuid", columnDefinition = "uuid", nullable = false)
    val coporateUuid: UUID,
    @Column(nullable = false)
    val type: String,
    val description: String?,
    val condition: String?,
    val timeframe: String?,
    @Column(name = "estimated_cost", precision = 10, scale = 2)
    val estimatedCost: BigDecimal?,
)
