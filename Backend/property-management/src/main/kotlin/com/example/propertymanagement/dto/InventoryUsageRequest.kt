package com.example.propertymanagement.dto
import java.util.UUID

data class InventoryUsageRequest(
    val name: String,
    val unit: Int,
    val buildingUuid: UUID,
)
