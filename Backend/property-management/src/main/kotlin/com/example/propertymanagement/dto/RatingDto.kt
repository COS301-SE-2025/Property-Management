package com.example.propertymanagement.dto
import java.util.UUID

data class RatingDto(
    val contractorUuid: UUID,
    val comment: String,
    val rating: Int,
    val taskUuid: UUID,
    val trusteeUuid: UUID,
)
