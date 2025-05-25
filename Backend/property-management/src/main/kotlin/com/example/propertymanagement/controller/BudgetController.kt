package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Budget
import com.example.propertymanagement.service.BudgetService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/budget")
class BudgetController(private val service: BudgetService) {
    @GetMapping("/{buildingId}")
    fun getBudgetByBuildingId(
        @PathVariable buildingId: Int,
    ): ResponseEntity<Budget> {
        val budget = service.getByBuildingId(buildingId)
        return if (budget != null) {
            ResponseEntity.ok(budget)
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
