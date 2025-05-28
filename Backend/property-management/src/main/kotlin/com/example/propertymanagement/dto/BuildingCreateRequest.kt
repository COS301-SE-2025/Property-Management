package com.example.propertymanagement.dto

import java.time.LocalDate

data class BuildingCreateRequest(
    val name: String,
    val address: String,
    val type: String?,
    val trustees: List<Int>?,
    val propertyValue: Double?,
    val primaryContractors: List<Int>?,
    val latestInspectionDate: LocalDate?,
    val propertyImage: String?,
)
