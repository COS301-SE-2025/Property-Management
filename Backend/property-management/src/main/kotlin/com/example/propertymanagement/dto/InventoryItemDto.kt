package com.example.propertymanagement.dto

import java.util.UUID

data class InventoryItemResponseDto(
    val itemUuid: UUID,
    val name: String?,
    val unit: String?,
    val quantityInStock: Int?,
    val buildingUuidFk: UUID
)

data class CreateInventoryItemDto(
    val name: String,
    val unit: String,
    val quantity: Int,
    val buildingUuid: UUID
)