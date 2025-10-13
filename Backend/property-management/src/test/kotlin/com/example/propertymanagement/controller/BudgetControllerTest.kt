package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.BudgetCreateDto
import com.example.propertymanagement.dto.BudgetResponseDto
import com.example.propertymanagement.dto.BudgetUpdateDto
import com.example.propertymanagement.service.BudgetService
import org.junit.jupiter.api.Test
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.mockito.kotlin.any
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.math.BigDecimal
import java.time.LocalDate
import java.util.UUID

@WebMvcTest(controllers = [BudgetController::class])
class BudgetControllerTest(
    @Autowired val mockMvc: MockMvc,
) {
    @MockBean
    lateinit var budgetService: BudgetService

    @Autowired
    lateinit var objectMapper: com.fasterxml.jackson.databind.ObjectMapper

    private val testUuid = UUID.randomUUID()
    private val buildingUuid = UUID.randomUUID()
    private val testYear = 2024

    @Test
    fun `createBudget should return 201 CREATED when budget is created successfully`() {
        val createDto =
            BudgetCreateDto(
                year = testYear,
                totalBudget = BigDecimal("100000.00"),
                maintenanceBudget = BigDecimal("50000.00"),
                inventoryBudget = BigDecimal("50000.00"),
                approvalDate = LocalDate.of(2024, 1, 1),
                notes = "Test notes",
                buildingUuid = buildingUuid,
            )

        val responseDto =
            BudgetResponseDto(
                budgetUuid = testUuid,
                year = testYear,
                totalBudget = BigDecimal("100000.00"),
                maintenanceBudget = BigDecimal("50000.00"),
                inventoryBudget = BigDecimal("50000.00"),
                approvalDate = LocalDate.of(2024, 1, 1),
                notes = "Test notes",
                inventorySpent = BigDecimal.ZERO,
                maintenanceSpent = BigDecimal.ZERO,
                buildingUuid = buildingUuid,
            )

        `when`(budgetService.createBudget(any())).thenReturn(responseDto)

        mockMvc
            .perform(
                post("/api/budgets")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(createDto)),
            ).andExpect(status().isCreated)
            .andExpect(jsonPath("$.budgetUuid").value(testUuid.toString()))
            .andExpect(jsonPath("$.year").value(testYear))
            .andExpect(jsonPath("$.totalBudget").value(100000.00))
            .andExpect(jsonPath("$.maintenanceBudget").value(50000.00))
            .andExpect(jsonPath("$.inventoryBudget").value(50000.00))
            .andExpect(jsonPath("$.notes").value("Test notes"))
            .andExpect(jsonPath("$.buildingUuid").value(buildingUuid.toString()))

        verify(budgetService).createBudget(any())
    }

    @Test
    fun `getAllBudgets should return 200 OK with list of budgets`() {
        val budgets =
            listOf(
                BudgetResponseDto(
                    budgetUuid = testUuid,
                    year = testYear,
                    totalBudget = BigDecimal("100000.00"),
                    maintenanceBudget = BigDecimal("50000.00"),
                    inventoryBudget = BigDecimal("50000.00"),
                    approvalDate = LocalDate.of(2024, 1, 1),
                    notes = "Budget 1",
                    inventorySpent = BigDecimal.ZERO,
                    maintenanceSpent = BigDecimal.ZERO,
                    buildingUuid = buildingUuid,
                ),
                BudgetResponseDto(
                    budgetUuid = UUID.randomUUID(),
                    year = 2025,
                    totalBudget = BigDecimal("200000.00"),
                    maintenanceBudget = BigDecimal("100000.00"),
                    inventoryBudget = BigDecimal("100000.00"),
                    approvalDate = LocalDate.of(2025, 1, 1),
                    notes = "Budget 2",
                    inventorySpent = BigDecimal.ZERO,
                    maintenanceSpent = BigDecimal.ZERO,
                    buildingUuid = UUID.randomUUID(),
                ),
            )

        `when`(budgetService.getAllBudgets()).thenReturn(budgets)

        mockMvc
            .perform(get("/api/budgets"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].year").value(testYear))
            .andExpect(jsonPath("$[1].year").value(2025))

        verify(budgetService).getAllBudgets()
    }

    @Test
    fun `getAllBudgets should return 200 OK with empty list when no budgets exist`() {
        `when`(budgetService.getAllBudgets()).thenReturn(emptyList())

        mockMvc
            .perform(get("/api/budgets"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(0))

        verify(budgetService).getAllBudgets()
    }

    @Test
    fun `getBudgetByUuid should return 200 OK when budget exists`() {
        val responseDto =
            BudgetResponseDto(
                budgetUuid = testUuid,
                year = testYear,
                totalBudget = BigDecimal("100000.00"),
                maintenanceBudget = BigDecimal("50000.00"),
                inventoryBudget = BigDecimal("50000.00"),
                approvalDate = LocalDate.of(2024, 1, 1),
                notes = "Test budget",
                inventorySpent = BigDecimal.ZERO,
                maintenanceSpent = BigDecimal.ZERO,
                buildingUuid = buildingUuid,
            )

        `when`(budgetService.getBudgetByUuid(testUuid)).thenReturn(responseDto)

        mockMvc
            .perform(get("/api/budgets/{uuid}", testUuid))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.budgetUuid").value(testUuid.toString()))
            .andExpect(jsonPath("$.year").value(testYear))

        verify(budgetService).getBudgetByUuid(testUuid)
    }

    @Test
    fun `getBudgetsByBuildingUuid should return 200 OK with list of budgets`() {
        val budgets =
            listOf(
                BudgetResponseDto(
                    budgetUuid = testUuid,
                    year = testYear,
                    totalBudget = BigDecimal("100000.00"),
                    maintenanceBudget = BigDecimal("50000.00"),
                    inventoryBudget = BigDecimal("50000.00"),
                    approvalDate = LocalDate.of(2024, 1, 1),
                    notes = "Budget 1",
                    inventorySpent = BigDecimal.ZERO,
                    maintenanceSpent = BigDecimal.ZERO,
                    buildingUuid = buildingUuid,
                ),
            )

        `when`(budgetService.getBudgetsByBuildingUuid(buildingUuid)).thenReturn(budgets)

        mockMvc
            .perform(get("/api/budgets/building/{uuid}", buildingUuid))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].buildingUuid").value(buildingUuid.toString()))

        verify(budgetService).getBudgetsByBuildingUuid(buildingUuid)
    }

    @Test
    fun `getBudgetsByBuildingUuid should return 200 OK with empty list when no budgets exist`() {
        `when`(budgetService.getBudgetsByBuildingUuid(buildingUuid)).thenReturn(emptyList())

        mockMvc
            .perform(get("/api/budgets/building/{uuid}", buildingUuid))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(0))

        verify(budgetService).getBudgetsByBuildingUuid(buildingUuid)
    }

    @Test
    fun `getBudgetsByYear should return 200 OK with list of budgets`() {
        val budgets =
            listOf(
                BudgetResponseDto(
                    budgetUuid = testUuid,
                    year = testYear,
                    totalBudget = BigDecimal("100000.00"),
                    maintenanceBudget = BigDecimal("50000.00"),
                    inventoryBudget = BigDecimal("50000.00"),
                    approvalDate = LocalDate.of(2024, 1, 1),
                    notes = "Budget 1",
                    inventorySpent = BigDecimal.ZERO,
                    maintenanceSpent = BigDecimal.ZERO,
                    buildingUuid = buildingUuid,
                ),
            )

        `when`(budgetService.getBudgetsByYear(testYear)).thenReturn(budgets)

        mockMvc
            .perform(get("/api/budgets/year/{year}", testYear))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].year").value(testYear))

        verify(budgetService).getBudgetsByYear(testYear)
    }

    @Test
    fun `getBudgetsByYear should return 200 OK with empty list when no budgets exist`() {
        `when`(budgetService.getBudgetsByYear(testYear)).thenReturn(emptyList())

        mockMvc
            .perform(get("/api/budgets/year/{year}", testYear))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(0))

        verify(budgetService).getBudgetsByYear(testYear)
    }

    @Test
    fun `getBudgetByBuildingAndYear should return 200 OK when budget exists`() {
        val responseDto =
            BudgetResponseDto(
                budgetUuid = testUuid,
                year = testYear,
                totalBudget = BigDecimal("100000.00"),
                maintenanceBudget = BigDecimal("50000.00"),
                inventoryBudget = BigDecimal("50000.00"),
                approvalDate = LocalDate.of(2024, 1, 1),
                notes = "Test budget",
                inventorySpent = BigDecimal.ZERO,
                maintenanceSpent = BigDecimal.ZERO,
                buildingUuid = buildingUuid,
            )

        `when`(budgetService.getBudgetByBuildingAndYear(buildingUuid, testYear)).thenReturn(responseDto)

        mockMvc
            .perform(get("/api/budgets/building/{uuid}/year/{year}", buildingUuid, testYear))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.budgetUuid").value(testUuid.toString()))
            .andExpect(jsonPath("$.year").value(testYear))

        verify(budgetService).getBudgetByBuildingAndYear(buildingUuid, testYear)
    }

    @Test
    fun `getBudgetByBuildingAndYear should return 404 NOT FOUND when budget does not exist`() {
        `when`(budgetService.getBudgetByBuildingAndYear(buildingUuid, testYear)).thenReturn(null)

        mockMvc
            .perform(get("/api/budgets/building/{uuid}/year/{year}", buildingUuid, testYear))
            .andExpect(status().isNotFound)

        verify(budgetService).getBudgetByBuildingAndYear(buildingUuid, testYear)
    }

    @Test
    fun `updateBudget should return 200 OK when budget is updated successfully`() {
        val updateDto =
            BudgetUpdateDto(
                year = testYear,
                totalBudget = BigDecimal("150000.00"),
                maintenanceBudget = null,
                inventoryBudget = null,
                approvalDate = null,
                notes = null,
                inventorySpent = null,
                maintenanceSpent = null,
                buildingUuid = null,
            )

        val responseDto =
            BudgetResponseDto(
                budgetUuid = testUuid,
                year = testYear,
                totalBudget = BigDecimal("150000.00"),
                maintenanceBudget = BigDecimal("50000.00"),
                inventoryBudget = BigDecimal("50000.00"),
                approvalDate = LocalDate.of(2024, 1, 1),
                notes = "Test notes",
                inventorySpent = BigDecimal.ZERO,
                maintenanceSpent = BigDecimal.ZERO,
                buildingUuid = buildingUuid,
            )

        `when`(budgetService.updateBudget(testUuid, updateDto)).thenReturn(responseDto)

        mockMvc
            .perform(
                put("/api/budgets/{uuid}", testUuid)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(updateDto)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.totalBudget").value(150000.00))

        verify(budgetService).updateBudget(testUuid, updateDto)
    }

    @Test
    fun `deleteBudget should return 204 NO CONTENT when budget is deleted successfully`() {
        mockMvc
            .perform(delete("/api/budgets/{uuid}", testUuid))
            .andExpect(status().isNoContent)

        verify(budgetService).deleteBudget(testUuid)
    }

    @Test
    fun `createBudget should return 400 BAD REQUEST when request body is invalid`() {
        mockMvc
            .perform(
                post("/api/budgets")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{ invalid json }"),
            ).andExpect(status().isBadRequest)
    }

    @Test
    fun `updateBudget should return 400 BAD REQUEST when request body is invalid`() {
        mockMvc
            .perform(
                put("/api/budgets/{uuid}", testUuid)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{ invalid json }"),
            ).andExpect(status().isBadRequest)
    }
}
