package com.example.propertymanagement.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Positive
import java.time.LocalDate
import java.util.UUID

data class BuildingCreateDto(
    @field:NotBlank val name: String?,
    @field:NotBlank val address: String?,
    @field:NotBlank val type: String?,
    @field:NotNull @field:Positive val propertyValue: Double?,
    @field:NotNull val primaryContractor: UUID?,
    @field:NotNull val latestInspectionDate: LocalDate?,
    @field:NotNull @field:Positive val area: Double?,
    @field:NotNull val trusteeUuid: UUID?,
    val coporateUuid: UUID? = null,
    val propertyImageId: String? = null,
)

data class BuildingUpdateDto(
    val name: String? = null,
    val address: String? = null,
    val type: String? = null,
    val propertyValue: Double? = null,
    val primaryContractor: UUID? = null,
    val latestInspectionDate: LocalDate? = null,
    val area: Double? = null,
    val trusteeUuid: UUID? = null,
    val coporateUuid: UUID? = null,
    val propertyImageId: String? = null,
)

data class BuildingResponseDto(
    val name: String?,
    val address: String?,
    val type: String?,
    val propertyValue: Double?,
    val primaryContractor: UUID?,
    val latestInspectionDate: LocalDate?,
    val propertyImage: String?,
    val area: Double,
    val buildingUuid: UUID,
    val trusteeUuid: UUID?,
    val coporateUuid: UUID?,
)

data class BuildingByTrusteeDto(
    val trusteeUuid: UUID,
    val buildings: List<BuildingResponseDto>,
)
