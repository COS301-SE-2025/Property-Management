package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Budget
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID


interface BudgetRepository : JpaRepository<Budget, Int> {
    fun findFirstByBuildingUuidFk(buildingUuidFk: UUID): Budget?
    fun findByBudgetUuid(budgetUuid: UUID): Budget?
}
