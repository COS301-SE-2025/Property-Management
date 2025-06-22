package com.example.propertymanagement.dto

import java.util.UUID
import java.math.BigDecimal
import java.time.LocalDate


data class BudgetCreateDto(
    val year: Int?,
    val totalBudget: BigDecimal?,
    val maintenanceBudget: BigDecimal?,
    val inventoryBudget: BigDecimal?,
    val approvedBy: Int?,
    val approvalDate: LocalDate?,
    val notes: String?,
    val buildingUuid: UUID?
)

data class BudgetUpdateDto(
    val year: Int?,
    val totalBudget: BigDecimal?,
    val maintenanceBudget: BigDecimal?,
    val inventoryBudget: BigDecimal?,
    val approvedBy: Int?,
    val approvalDate: LocalDate?,
    val notes: String?,
    val inventorySpent: BigDecimal?,
    val maintenanceSpent: BigDecimal?,
    val buildingUuid: UUID?
)

data class BudgetResponseDto(
    val budgetUuid: UUID,
    val year: Int?,
    val totalBudget: BigDecimal?,
    val maintenanceBudget: BigDecimal?,
    val inventoryBudget: BigDecimal?,
    val approvedBy: Int?,
    val approvalDate: LocalDate?,
    val notes: String?,
    val inventorySpent: BigDecimal,
    val maintenanceSpent: BigDecimal,
    val buildingUuid: UUID?
)