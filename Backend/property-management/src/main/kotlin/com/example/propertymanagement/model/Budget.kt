package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal

@Entity
@Table(name = "budget")
data class Budget(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_id")
    val budgetId: Int = 0,
    @Column(name = "building_id")
    val buildingId: Int,
    @Column(name = "total_budget")
    val totalBudget: BigDecimal? = null,
    @Column(name = "maintenance_budget")
    val maintenanceBudget: BigDecimal? = null,
    @Column(name = "inventory_budget")
    val inventoryBudget: BigDecimal? = null,
    @Column(name = "inventory_spent")
    val inventorySpent: BigDecimal? = null,
    @Column(name = "maintenance_spent")
    val maintenanceSpent: BigDecimal? = null
)
