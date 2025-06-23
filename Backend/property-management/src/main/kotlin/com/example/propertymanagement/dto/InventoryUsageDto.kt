package com.example.propertymanagement.dto

import java.sql.Date
import java.util.UUID

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
    val trusteeApproved: Boolean,
    val approvalDate: Date?,
)

data class ApprovalRequest(
    val trusteeApproved: Boolean,
    val approvalDate: Date = Date(System.currentTimeMillis()),
)
