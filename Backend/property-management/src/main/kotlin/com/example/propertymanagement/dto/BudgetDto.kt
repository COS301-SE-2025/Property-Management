package com.example.propertymanagement.dto

import java.math.BigDecimal
import java.time.LocalDate
import java.util.UUID

data class BudgetCreateDto(
    val year: Int?,
    val totalBudget: BigDecimal?,
    val maintenanceBudget: BigDecimal?,
    val inventoryBudget: BigDecimal?,
    val approvalDate: LocalDate?,
    val notes: String?,
    val buildingUuid: UUID?,
)

data class BudgetUpdateDto(
    val year: Int?,
    val totalBudget: BigDecimal?,
    val maintenanceBudget: BigDecimal?,
    val inventoryBudget: BigDecimal?,
    val approvalDate: LocalDate?,
    val notes: String?,
    val inventorySpent: BigDecimal?,
    val maintenanceSpent: BigDecimal?,
    val buildingUuid: UUID?,
)

data class BudgetResponseDto(
    val budgetUuid: UUID,
    val year: Int?,
    val totalBudget: BigDecimal?,
    val maintenanceBudget: BigDecimal?,
    val inventoryBudget: BigDecimal?,
    val approvalDate: LocalDate?,
    val notes: String?,
    val inventorySpent: BigDecimal,
    val maintenanceSpent: BigDecimal,
    val buildingUuid: UUID?,
)
