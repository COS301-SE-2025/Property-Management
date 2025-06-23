package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.LocalDate
import java.util.UUID

@Entity
@Table(name = "budget")
data class Budget(
    @Id
    @Column(name = "budget_uuid")
    val budgetUuid: UUID = UUID.randomUUID(),
    @Column(name = "year")
    val year: Int?,
    @Column(name = "total_budget", precision = 12, scale = 2)
    val totalBudget: BigDecimal?,
    @Column(name = "maintenance_budget", precision = 12, scale = 2)
    val maintenanceBudget: BigDecimal?,
    @Column(name = "inventory_budget", precision = 12, scale = 2)
    val inventoryBudget: BigDecimal?,
    @Column(name = "approved_by")
    val approvedBy: Int?,
    @Column(name = "approval_date")
    val approvalDate: LocalDate?,
    @Column(name = "notes")
    val notes: String?,
    @Column(name = "inventory_spent", precision = 10, scale = 2)
    val inventorySpent: BigDecimal = BigDecimal.ZERO,
    @Column(name = "maintenance_spent", precision = 10, scale = 2)
    val maintenanceSpent: BigDecimal = BigDecimal.ZERO,
    @Column(name = "building_uuid_fk")
    val buildingUuid: UUID?,
)
