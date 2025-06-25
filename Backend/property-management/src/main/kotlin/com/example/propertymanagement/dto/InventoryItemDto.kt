package com.example.propertymanagement.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.PositiveOrZero
import java.util.UUID

data class InventoryItemResponseDto(
    val itemUuid: UUID,
    val name: String?,
    val unit: String?,
    val quantityInStock: Int?,
    val buildingUuidFk: UUID,
)

data class CreateInventoryItemDto(
    @field:NotBlank(message = "Name is required")
    val name: String,
    @field:NotBlank(message = "Unit is required")
    val unit: String,
    @field:NotNull(message = "Quantity is required")
    @field:PositiveOrZero(message = "Quantity must be zero or positive")
    val quantity: Int,
    @field:NotNull(message = "Building UUID is required")
    val buildingUuid: UUID,
)

data class UpdateInventoryItemDto(
    val name: String?,
    val unit: String?,
    @field:PositiveOrZero(message = "Quantity must be zero or positive")
    val quantity: Int?,
)

data class QuantityUpdateDto(
    @field:NotNull(message = "Quantity is required")
    val quantity: Int,
    @field:NotBlank(message = "Operation is required")
    val operation: String, // "SET", "ADD", "SUBTRACT"
) {
    enum class Operation {
        SET,
        ADD,
        SUBTRACT,
        ;

        companion object {
            fun fromString(value: String): Operation =
                try {
                    valueOf(value.uppercase())
                } catch (e: IllegalArgumentException) {
                    throw IllegalArgumentException("Invalid operation: $value. Valid operations: SET, ADD, SUBTRACT")
                }
        }
    }
}
