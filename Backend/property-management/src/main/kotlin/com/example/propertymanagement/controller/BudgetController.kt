package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Budget
import com.example.propertymanagement.service.BudgetService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/budget")
class BudgetController(
    private val service: BudgetService,
) {
    @GetMapping("/by-building/{buildingUuid}")
    fun getBudgetByBuildingUuid(
        @PathVariable buildingUuid: UUID,
    ): ResponseEntity<Budget> {
        val budget = service.getByBuildingUuid(buildingUuid)
        return if (budget != null) ResponseEntity.ok(budget) else ResponseEntity.notFound().build()
    }

    @GetMapping("/{budgetUuid}")
    fun getBudgetByUuid(
        @PathVariable budgetUuid: UUID,
    ): ResponseEntity<Budget> {
        val budget = service.getByBudgetUuid(budgetUuid)
        return if (budget != null) ResponseEntity.ok(budget) else ResponseEntity.notFound().build()
    }
}
