package com.example.propertymanagement.dto

import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

data class CreateTaskProgressDTO(
    val contractorUuid: UUID,
    val taskUuid: UUID,
    val imageId: String? = null,
    val progressPercentage: BigDecimal = BigDecimal.ZERO,
    val workDescription: String? = null,
    val inventoryUsageUuid: UUID? = null,
    val quantityUsed: Int? = null,
    val remarks: String? = null,
)

data class UpdateTaskProgressDTO(
    val progressPercentage: BigDecimal? = null,
    val workDescription: String? = null,
    val imageId: String? = null,
    val quantityUsed: Int? = null,
    val remarks: String? = null,
)

data class TaskProgressResponseDTO(
    val progressUuid: UUID,
    val submissionDate: LocalDateTime,
    val contractorUuid: UUID,
    val taskUuid: UUID,
    val imageId: String?,
    val progressPercentage: BigDecimal = BigDecimal.ZERO,
    val workDescription: String?,
    val inventoryUsageUuid: UUID?,
    val quantityUsed: Int?,
    val remarks: String?,
    val lastUpdated: LocalDateTime,
)
