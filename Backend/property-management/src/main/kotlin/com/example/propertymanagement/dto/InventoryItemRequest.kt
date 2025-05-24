package com.example.propertymanagement.dto

data class InventoryItemRequest(
    val name: String,
    val building_id: Int,
    val quantity: Int,
    val price: Double
)
