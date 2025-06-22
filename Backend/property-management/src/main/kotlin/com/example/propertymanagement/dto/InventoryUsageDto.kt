package com.example.propertymanagement.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.PositiveOrZero
import java.util.UUID
import java.sql.Date

data class CreateInventoryUsageRequest(
    val itemUuid: UUID,
    val taskUuid: UUID,
    val usedByContractorUuid: UUID,
    val quantityUsed: Int,
)

data class UpdateInventoryUsageRequest(
    val quantityUsed: Int?,
    val trusteeApproved: Boolean?,
    val approvalDate: Date?,
)

data class InventoryUsageResponse(
    val usageUuid: UUID,
    val itemUuid: UUID,
    val taskUuid: UUID,
    val usedByContractorUuid: UUID,
    val quantityUsed: Int,
    val trusteeApproved: Boolean ,
    val approvalDate: Date?,
)

data class ApprovalRequest(
    val trusteeApproved: Boolean,
    val approvalDate: Date = Date(System.currentTimeMillis())
)
