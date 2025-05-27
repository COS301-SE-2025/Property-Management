package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Budget
import com.example.propertymanagement.service.BudgetService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.kotlin.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.math.BigDecimal

@WebMvcTest(BudgetController::class)
class BudgetControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc
    
    @Suppress("DEPRECATION")
    @MockBean
    lateinit var budgetService: BudgetService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `should return budget for valid buildingId`() {
        val budget =
            Budget(
                budgetId = 1,
                buildingId = 1,
                totalBudget = BigDecimal("1000000.00"),
                maintenanceBudget = BigDecimal("500000.00"),
                inventoryBudget = BigDecimal("500000.00"),
                inventorySpent = BigDecimal("50250.00"),
                maintenanceSpent = BigDecimal("50000.00"),
            )
        given(budgetService.getByBuildingId(1)).willReturn(budget)

        mockMvc.perform(get("/api/budget/1"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.budgetId").value(1))
            .andExpect(jsonPath("$.buildingId").value(1))
            .andExpect(jsonPath("$.totalBudget").value(1000000.00))
            .andExpect(jsonPath("$.maintenanceBudget").value(500000.00))
            .andExpect(jsonPath("$.inventoryBudget").value(500000.00))
            .andExpect(jsonPath("$.inventorySpent").value(50250.00))
            .andExpect(jsonPath("$.maintenanceSpent").value(50000.00))
    }

    @Test
    fun `should return 404 when budget not found`() {
        given(budgetService.getByBuildingId(999)).willReturn(null)

        mockMvc.perform(get("/api/budget/999"))
            .andExpect(status().isNotFound)
    }

    @Test
    fun `should return 400 for non-numeric buildingId`() {
        mockMvc.perform(get("/api/budget/abc"))
            .andExpect(status().isBadRequest)
    }
}
