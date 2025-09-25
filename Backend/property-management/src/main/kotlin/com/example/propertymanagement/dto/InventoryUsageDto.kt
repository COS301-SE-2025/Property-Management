package com.example.propertymanagement.dto
import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDate
import java.util.UUID

data class CreateInventoryUsageRequest(
    val itemUuid: UUID,
    val taskUuid: UUID,
    val usedByContractorUuid: UUID?,
    val quantityUsed: Int,
)

data class UpdateInventoryUsageRequest(
    val quantityUsed: Int?,
    val trusteeApproved: Boolean?,
    val approvalDate: LocalDate?,
)

data class InventoryUsageResponse(
    val usageUuid: UUID,
    val itemUuid: UUID,
    val taskUuid: UUID,
    val usedByContractorUuid: UUID?,
    val quantityUsed: Int,
    val trusteeApproved: Boolean,
    @JsonFormat(pattern = "yyyy-MM-dd")
    val approvalDate: LocalDate?,
)

data class ApprovalRequest(
    val trusteeApproved: Boolean,
    val approvalDate: LocalDate? = null,
)

data class AssignContractorRequest(
    val contractorUuid: UUID,
)
