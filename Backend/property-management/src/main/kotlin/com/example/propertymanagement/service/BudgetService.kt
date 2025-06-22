package com.example.propertymanagement.service

import com.example.propertymanagement.model.Budget
import com.example.propertymanagement.dto.BudgetCreateDto
import com.example.propertymanagement.dto.BudgetUpdateDto
import com.example.propertymanagement.dto.BudgetResponseDto
import com.example.propertymanagement.repository.BudgetRepository
import com.example.propertymanagement.exception.RestException
import org.springframework.http.HttpStatus
import org.springframework.transaction.annotation.Transactional
import org.springframework.stereotype.Service
import java.util.UUID

@Service
@Transactional
class BudgetService(
    private val budgetRepository: BudgetRepository
) {
    
    fun createBudget(createDto: BudgetCreateDto): BudgetResponseDto {
        val budget = Budget(
            year = createDto.year,
            totalBudget = createDto.totalBudget,
            maintenanceBudget = createDto.maintenanceBudget,
            inventoryBudget = createDto.inventoryBudget,
            approvedBy = createDto.approvedBy,
            approvalDate = createDto.approvalDate,
            notes = createDto.notes,
            buildingUuid = createDto.buildingUuid
        )
        
        val savedBudget = budgetRepository.save(budget)
        return mapToResponseDto(savedBudget)
    }
    
    fun getBudgetByUuid(budgetUuid: UUID): BudgetResponseDto {
        val budget = budgetRepository.findById(budgetUuid)
            .orElseThrow { RestException(HttpStatus.NOT_FOUND, "Budget not found with UUID: $budgetUuid") }
        return mapToResponseDto(budget)
    }
    
    fun getBudgetsByBuildingUuid(buildingUuid: UUID): List<BudgetResponseDto> {
        val budgets = budgetRepository.findByBuildingUuid(buildingUuid)
        return budgets.map { mapToResponseDto(it) }
    }
    
    fun getAllBudgets(): List<BudgetResponseDto> {
        val budgets = budgetRepository.findAll()
        return budgets.map { mapToResponseDto(it) }
    }
    
    fun updateBudget(budgetUuid: UUID, updateDto: BudgetUpdateDto): BudgetResponseDto {
        val existingBudget = budgetRepository.findById(budgetUuid)
            .orElseThrow { RestException(HttpStatus.NOT_FOUND, "Budget not found with UUID: $budgetUuid") }
        
        val updatedBudget = existingBudget.copy(
            year = updateDto.year ?: existingBudget.year,
            totalBudget = updateDto.totalBudget ?: existingBudget.totalBudget,
            maintenanceBudget = updateDto.maintenanceBudget ?: existingBudget.maintenanceBudget,
            inventoryBudget = updateDto.inventoryBudget ?: existingBudget.inventoryBudget,
            approvedBy = updateDto.approvedBy ?: existingBudget.approvedBy,
            approvalDate = updateDto.approvalDate ?: existingBudget.approvalDate,
            notes = updateDto.notes ?: existingBudget.notes,
            inventorySpent = updateDto.inventorySpent ?: existingBudget.inventorySpent,
            maintenanceSpent = updateDto.maintenanceSpent ?: existingBudget.maintenanceSpent,
            buildingUuid = updateDto.buildingUuid ?: existingBudget.buildingUuid
        )
        
        val savedBudget = budgetRepository.save(updatedBudget)
        return mapToResponseDto(savedBudget)
    }
    
    fun deleteBudget(budgetUuid: UUID) {
        if (!budgetRepository.existsById(budgetUuid)) {
            throw RestException(HttpStatus.NOT_FOUND, "Budget not found with UUID: $budgetUuid")
        }
        budgetRepository.deleteById(budgetUuid)
    }
    
    fun getBudgetsByYear(year: Int): List<BudgetResponseDto> {
        val budgets = budgetRepository.findByYear(year)
        return budgets.map { mapToResponseDto(it) }
    }
    
    fun getBudgetByBuildingAndYear(buildingUuid: UUID, year: Int): BudgetResponseDto? {
        val budget = budgetRepository.findByBuildingUuidAndYear(buildingUuid, year)
        return budget?.let { mapToResponseDto(it) }
    }
    
    private fun mapToResponseDto(budget: Budget): BudgetResponseDto {
        return BudgetResponseDto(
            budgetUuid = budget.budgetUuid,
            year = budget.year,
            totalBudget = budget.totalBudget,
            maintenanceBudget = budget.maintenanceBudget,
            inventoryBudget = budget.inventoryBudget,
            approvedBy = budget.approvedBy,
            approvalDate = budget.approvalDate,
            notes = budget.notes,
            inventorySpent = budget.inventorySpent,
            maintenanceSpent = budget.maintenanceSpent,
            buildingUuid = budget.buildingUuid
        )
    }
}
