package com.example.propertymanagement.dto

data class MaintenanceTaskDto(
    val title: String,
    val description: String,
    val status: String,
    val approved: Boolean,
    val proofImages: List<String>?,
)

data class BuildingDetailsResponse(
    val name: String,
    val address: String,
    val totalBudget: Double,
    val maintenanceBudget: Double,
    val inventoryBudget: Double,
    val inventorySpent: Double,
    val maintenanceSpent: Double,
    val maintenanceTasks: List<MaintenanceTaskDto>,
)
