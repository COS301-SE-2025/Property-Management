package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Budget
import com.example.propertymanagement.service.BudgetService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/budget")
class BudgetController(private val service: BudgetService) {

    @GetMapping("/{buildingId}")
    fun getBudgetByBuildingId(@PathVariable buildingId: Int): ResponseEntity<Budget> {
        val budget = service.getByBuildingId(buildingId)
        return if (budget != null) ResponseEntity.ok(budget)
        else ResponseEntity.notFound().build()
    }
}