package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Budget
import org.springframework.data.jpa.repository.JpaRepository

interface BudgetRepository : JpaRepository<Budget, Int> {
    fun findFirstByBuildingId(buildingId: Int): Budget?
}