package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.LocalDate
import java.util.UUID

@Entity
@Table(name = "budget")
data class Budget(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_uuid", unique = true)
    val budgetUuid: UUID = UUID.randomUUID(),
    @Column(name = "building_id")
    val buildingId: Int? = null,
    @Column(name = "building_uuid_fk")
    val buildingUuid: UUID,
    @Column(name = "year")
    val year: Int? = null,
    @Column(name = "total_budget")
    val totalBudget: BigDecimal? = null,
    @Column(name = "maintenance_budget")
    val maintenanceBudget: BigDecimal? = null,
    @Column(name = "inventory_budget")
    val inventoryBudget: BigDecimal? = null,
    @Column(name = "inventory_spent")
    val inventorySpent: BigDecimal? = null,
    @Column(name = "maintenance_spent")
    val maintenanceSpent: BigDecimal? = null,
    @Column(name = "approved_by")
    val approvedBy: Int? = null,
    @Column(name = "approval_date")
    val approvalDate: LocalDate? = null,
    @Column(name = "notes")
    val notes: String? = null,
)
