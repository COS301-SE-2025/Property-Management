package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Budget
import com.example.propertymanagement.service.BudgetService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.http.HttpStatus
import com.example.propertymanagement.dto.BudgetCreateDto
import com.example.propertymanagement.dto.BudgetUpdateDto
import com.example.propertymanagement.dto.BudgetResponseDto
import java.util.UUID

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = ["*"])
class BudgetController(
    private val budgetService: BudgetService
) {
    
    @PostMapping
    fun createBudget(@RequestBody createDto: BudgetCreateDto): ResponseEntity<BudgetResponseDto> {
        val budget = budgetService.createBudget(createDto)
        return ResponseEntity.status(HttpStatus.CREATED).body(budget)
    }
    
    @GetMapping("/{budgetUuid}")
    fun getBudgetByUuid(@PathVariable budgetUuid: UUID): ResponseEntity<BudgetResponseDto> {
        val budget = budgetService.getBudgetByUuid(budgetUuid)
        return ResponseEntity.ok(budget)
    }
    
    @GetMapping
    fun getAllBudgets(): ResponseEntity<List<BudgetResponseDto>> {
        val budgets = budgetService.getAllBudgets()
        return ResponseEntity.ok(budgets)
    }
    
    @GetMapping("/building/{buildingUuid}")
    fun getBudgetsByBuildingUuid(@PathVariable buildingUuid: UUID): ResponseEntity<List<BudgetResponseDto>> {
        val budgets = budgetService.getBudgetsByBuildingUuid(buildingUuid)
        return ResponseEntity.ok(budgets)
    }
    
    @GetMapping("/year/{year}")
    fun getBudgetsByYear(@PathVariable year: Int): ResponseEntity<List<BudgetResponseDto>> {
        val budgets = budgetService.getBudgetsByYear(year)
        return ResponseEntity.ok(budgets)
    }
    
    @GetMapping("/building/{buildingUuid}/year/{year}")
    fun getBudgetByBuildingAndYear(
        @PathVariable buildingUuid: UUID,
        @PathVariable year: Int
    ): ResponseEntity<BudgetResponseDto?> {
        val budget = budgetService.getBudgetByBuildingAndYear(buildingUuid, year)
        return if (budget != null) {
            ResponseEntity.ok(budget)
        } else {
            ResponseEntity.notFound().build()
        }
    }
    
    @PutMapping("/{budgetUuid}")
    fun updateBudget(
        @PathVariable budgetUuid: UUID,
        @RequestBody updateDto: BudgetUpdateDto
    ): ResponseEntity<BudgetResponseDto> {
        val budget = budgetService.updateBudget(budgetUuid, updateDto)
        return ResponseEntity.ok(budget)
    }
    
    @DeleteMapping("/{budgetUuid}")
    fun deleteBudget(@PathVariable budgetUuid: UUID): ResponseEntity<Void> {
        budgetService.deleteBudget(budgetUuid)
        return ResponseEntity.noContent().build()
    }
}
