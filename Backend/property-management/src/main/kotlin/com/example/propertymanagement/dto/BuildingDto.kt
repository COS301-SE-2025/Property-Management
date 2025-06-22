package com.example.propertymanagement.dto

import com.example.propertymanagement.model.Building
import java.util.UUID
import java.time.LocalDate

data class BuildingCreateDto(
    val name: String?,
    val address: String?,
    val type: String?,
    val propertyValue: Double?,
    val primaryContractors: Array<Int>?,
    val latestInspectionDate: LocalDate?,
    val complexName: String?,
    val trusteeUuid: UUID?,
    val propertyImageId: String? = null 
)

data class BuildingUpdateDto(
    val name: String?,
    val address: String?,
    val type: String?,
    val propertyValue: Double?,
    val primaryContractors: Array<Int>?,
    val latestInspectionDate: LocalDate?,
    val complexName: String?,
    val trusteeUuid: UUID?,
    val propertyImageId: String? = null
)

data class BuildingResponseDto(
    val name: String?,
    val address: String?,
    val type: String?,
    val propertyValue: Double?,
    val primaryContractors: Array<Int>?,
    val latestInspectionDate: LocalDate?,
    val propertyImage: String?,
    val complexName: String?,
    val buildingUuid: UUID,
    val trusteeUuid: UUID?
)

data class BuildingByTrusteeDto(
    val trusteeUuid: UUID,
    val buildings: List<BuildingResponseDto>
)