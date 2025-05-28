package com.example.propertymanagement.service

import com.example.propertymanagement.model.Budget
import com.example.propertymanagement.repository.BudgetRepository
import org.springframework.stereotype.Service

@Service
class BudgetService(
    private val repository: BudgetRepository,
) {
    fun getByBuildingId(buildingId: Int): Budget? = repository.findFirstByBuildingId(buildingId)
}
