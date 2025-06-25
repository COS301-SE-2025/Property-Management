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
    @field:NotNull val primaryContractors: Array<Int>?,
    @field:NotNull val latestInspectionDate: LocalDate?,
    // @field:NotBlank val complexName: String?,
    @field:NotNull val trusteeUuid: UUID?,
    val propertyImageId: String? = null,
)

data class BuildingUpdateDto(
    val name: String? = null,
    val address: String? = null,
    val type: String? = null,
    val propertyValue: Double? = null,
    val primaryContractors: Array<Int>? = null,
    val latestInspectionDate: LocalDate? = null,
    // val complexName: String? = null,
    val trusteeUuid: UUID? = null,
    val propertyImageId: String? = null,
)

data class BuildingResponseDto(
    val name: String?,
    val address: String?,
    val type: String?,
    val propertyValue: Double?,
    val primaryContractors: Array<Int>?,
    val latestInspectionDate: LocalDate?,
    val propertyImage: String?,
    // val complexName: String?,
    val buildingUuid: UUID,
    val trusteeUuid: UUID?,
)

data class BuildingByTrusteeDto(
    val trusteeUuid: UUID,
    val buildings: List<BuildingResponseDto>,
)
