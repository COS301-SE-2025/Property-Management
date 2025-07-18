package com.example.propertymanagement.dto

import java.math.BigDecimal
import java.util.UUID

data class CreateLifecycleCostRequest(
    val coporateUuid: UUID,
    val type: String,
    val description: String?,
    val condition: String?,
    val timeframe: String?,
    val estimatedCost: BigDecimal?
)

data class UpdateLifecycleCostRequest(
    val type: String,
    val description: String?,
    val condition: String?,
    val timeframe: String?,
    val estimatedCost: BigDecimal?
)

data class LifecycleCostResponse(
    val costUuid: UUID,
    val coporateUuid: UUID,
    val type: String,
    val description: String?,
    val condition: String?,
    val timeframe: String?,
    val estimatedCost: BigDecimal?
)
