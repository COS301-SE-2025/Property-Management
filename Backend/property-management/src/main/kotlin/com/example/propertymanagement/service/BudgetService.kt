package com.example.propertymanagement.service

import com.example.propertymanagement.model.Budget
import com.example.propertymanagement.repository.BudgetRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class BudgetService(
    private val repository: BudgetRepository,
) {
    fun getByBuildingUuid(buildingUuidFk: UUID): Budget? {
        return repository.findFirstByBuildingUuidFk(buildingUuidFk)
    }

    fun getByBudgetUuid(budgetUuid: UUID): Budget? {
        return repository.findByBudgetUuid(budgetUuid)
    }
}
