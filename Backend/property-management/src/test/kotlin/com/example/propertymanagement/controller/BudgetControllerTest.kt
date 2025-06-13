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
import java.util.UUID

@WebMvcTest(BudgetController::class)
class BudgetControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var budgetService: BudgetService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `should return budget for valid buildingUuid`() {
        val buildingUuid = UUID.randomUUID()
        val budgetUuid = UUID.randomUUID()

        val budget = Budget(
            budgetId = 1,
            budgetUuid = budgetUuid,
            buildingId = null,
            buildingUuid = buildingUuid,
            year = 2025,
            totalBudget = BigDecimal("1000000.00"),
            maintenanceBudget = BigDecimal("500000.00"),
            inventoryBudget = BigDecimal("500000.00"),
            inventorySpent = BigDecimal("50250.00"),
            maintenanceSpent = BigDecimal("50000.00"),
            approvedBy = null,
            approvalDate = null,
            notes = null
        )
        given(budgetService.getByBuildingUuid(buildingUuid)).willReturn(budget)

        mockMvc
            .perform(get("/api/budget/by-building/$buildingUuid"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.budgetId").value(1))
            .andExpect(jsonPath("$.budgetUuid").value(budgetUuid.toString()))
            .andExpect(jsonPath("$.buildingUuid").value(buildingUuid.toString()))
            .andExpect(jsonPath("$.totalBudget").value(1000000.00))
            .andExpect(jsonPath("$.maintenanceBudget").value(500000.00))
            .andExpect(jsonPath("$.inventoryBudget").value(500000.00))
            .andExpect(jsonPath("$.inventorySpent").value(50250.00))
            .andExpect(jsonPath("$.maintenanceSpent").value(50000.00))
    }

    @Test
    fun `should return 404 when budget not found for buildingUuid`() {
        val buildingUuid = UUID.randomUUID()
        given(budgetService.getByBuildingUuid(buildingUuid)).willReturn(null)

        mockMvc.perform(get("/api/budget/by-building/$buildingUuid"))
            .andExpect(status().isNotFound)
    }

     @Test
    fun `should return 400 for invalid UUID format`() {
        mockMvc.perform(get("/api/budget/by-building/invalid-uuid"))
            .andExpect(status().isBadRequest)
    }
}
