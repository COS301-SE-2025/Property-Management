package com.example.propertymanagement.dto

import java.sql.Date
import java.time.LocalDate
import java.util.UUID

data class MaintenanceTaskCreateDto(
    val title: String,
    val description: String?,
    val scheduledDate: LocalDate?,
    val buildingUuid: UUID,
    val createdByUuid: UUID,
    val imageUuid: String? = null,
    val trusteeUuid: UUID,
    val contractorUuid: UUID? = null,
)

data class MaintenanceTaskResponseDto(
    val taskUuid: UUID,
    val title: String?,
    val description: String?,
    val status: String,
    val scheduledDate: LocalDate?,
    val approved: Boolean,
    val approvalStatus: String,
    val buildingUuid: UUID?,
    val createdByUuid: UUID?,
    val imageUuid: String?,
    val trusteeUuid: UUID?,
    val contractorUuid: UUID? = null,
)

data class MaintenanceTaskUpdateDto(
    val title: String? = null,
    val description: String? = null,
    val scheduledDate: LocalDate? = null,
    val approvalStatus: String? = null, // PENDING, APPROVED, DENIED
    val contractorUuid: UUID? = null,
    val imageUuid: String? = null,
)

data class TaskContractorAssignDto(
    val taskUuid: UUID,
    val contractorUuids: List<UUID>,
)

data class QuoteCreateDto(
    val amount: Double,
    val documentUrl: String?,
    val taskUuid: UUID,
    val contractorUuid: UUID,
    val submittedOn: Date? = Date(System.currentTimeMillis()),
    val status: String = "SUBMITTED",
)
