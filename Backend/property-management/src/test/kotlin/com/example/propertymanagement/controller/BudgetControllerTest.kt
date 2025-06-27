package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.BudgetCreateDto
import com.example.propertymanagement.dto.BudgetResponseDto
import com.example.propertymanagement.service.BudgetService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.kotlin.any
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.math.BigDecimal
import java.time.LocalDate
import java.util.UUID

@WebMvcTest(BudgetController::class)
class BudgetControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @MockBean
    private lateinit var budgetService: BudgetService

    private val budgetUuid = UUID.randomUUID()
    private val buildingUuid = UUID.randomUUID()

    private fun sampleBudgetResponse(): BudgetResponseDto =
        BudgetResponseDto(
            budgetUuid = budgetUuid,
            year = 2024,
            totalBudget = BigDecimal("50000.00"),
            maintenanceBudget = BigDecimal("20000.00"),
            inventoryBudget = BigDecimal("10000.00"),
            approvalDate = LocalDate.now(),
            notes = "Annual budget",
            inventorySpent = BigDecimal("2500.00"),
            maintenanceSpent = BigDecimal("1500.00"),
            buildingUuid = buildingUuid,
        )

    @Test
    fun `createBudget returns 201 when successful`() {
        val createDto =
            BudgetCreateDto(
                year = 2024,
                totalBudget = BigDecimal("50000.00"),
                maintenanceBudget = BigDecimal("20000.00"),
                inventoryBudget = BigDecimal("10000.00"),
                approvalDate = LocalDate.now(),
                notes = "Annual budget",
                buildingUuid = buildingUuid,
            )

        Mockito.`when`(budgetService.createBudget(any())).thenReturn(sampleBudgetResponse())

        mockMvc
            .perform(
                post("/api/budgets")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(createDto)),
            ).andExpect(status().isCreated)
            .andExpect(jsonPath("$.budgetUuid").value(budgetUuid.toString()))
    }

    @Test
    fun `getBudgetByUuid returns 200 with budget`() {
        Mockito.`when`(budgetService.getBudgetByUuid(budgetUuid)).thenReturn(sampleBudgetResponse())

        mockMvc
            .perform(get("/api/budgets/$budgetUuid"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.budgetUuid").value(budgetUuid.toString()))
    }

    @Test
    fun `getAllBudgets returns 200 with list`() {
        Mockito.`when`(budgetService.getAllBudgets()).thenReturn(listOf(sampleBudgetResponse()))

        mockMvc
            .perform(get("/api/budgets"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].budgetUuid").value(budgetUuid.toString()))
    }

    @Test
    fun `getBudgetsByBuildingUuid returns 200 with list`() {
        Mockito.`when`(budgetService.getBudgetsByBuildingUuid(buildingUuid)).thenReturn(listOf(sampleBudgetResponse()))

        mockMvc
            .perform(get("/api/budgets/building/$buildingUuid"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].budgetUuid").value(budgetUuid.toString()))
    }

    @Test
    fun `getBudgetsByYear returns 200 with list`() {
        Mockito.`when`(budgetService.getBudgetsByYear(2024)).thenReturn(listOf(sampleBudgetResponse()))

        mockMvc
            .perform(get("/api/budgets/year/2024"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].budgetUuid").value(budgetUuid.toString()))
    }

    @Test
    fun `getBudgetByBuildingAndYear returns 200 when budget exists`() {
        Mockito.`when`(budgetService.getBudgetByBuildingAndYear(buildingUuid, 2024)).thenReturn(sampleBudgetResponse())

        mockMvc
            .perform(get("/api/budgets/building/$buildingUuid/year/2024"))
            .andExpect(status().isOk)
            .andExpect(jsonPath(".budgetUuid").value(budgetUuid.toString()))
    }

    @Test
    fun `deleteBudget returns 204 when successful`() {
        mockMvc
            .perform(delete("/api/budgets/$budgetUuid"))
            .andExpect(status().isNoContent)
    }
}
