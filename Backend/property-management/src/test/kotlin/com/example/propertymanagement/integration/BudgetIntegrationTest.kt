package com.example.propertymanagement.integration

import com.example.propertymanagement.dto.BudgetCreateDto
import com.example.propertymanagement.dto.BudgetUpdateDto
import com.example.propertymanagement.dto.BudgetResponseDto
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.springframework.test.context.ActiveProfiles
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.containers.PostgreSQLContainer
import java.math.BigDecimal
import java.time.LocalDate
import java.util.UUID

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integration")
@Testcontainers
class BudgetIntegrationTest {

    companion object {
        @Container
        val postgres = PostgreSQLContainer<Nothing>("postgres:16").apply {
            withDatabaseName("property_management_test")
            withUsername("postgres")
            withPassword("pg123")
        }

        @JvmStatic
        @DynamicPropertySource
        fun registerPgProperties(registry: DynamicPropertyRegistry) {
            registry.add("spring.datasource.url", postgres::getJdbcUrl)
            registry.add("spring.datasource.username", postgres::getUsername)
            registry.add("spring.datasource.password", postgres::getPassword)
        }
    }

    @LocalServerPort
    var port: Int = 0

    @Autowired
    lateinit var restTemplate: TestRestTemplate

    // Helper to create a budget and return the response
    fun createBudget(
        year: Int = 2024,
        totalBudget: BigDecimal = BigDecimal("10000.00"),
        maintenanceBudget: BigDecimal = BigDecimal("3000.00"),
        inventoryBudget: BigDecimal = BigDecimal("2000.00"),
        approvalDate: LocalDate = LocalDate.now(),
        notes: String = "Initial budget",
        buildingUuid: UUID = UUID.randomUUID()
    ): BudgetResponseDto {
        val createDto = BudgetCreateDto(
            year = year,
            totalBudget = totalBudget,
            maintenanceBudget = maintenanceBudget,
            inventoryBudget = inventoryBudget,
            approvalDate = approvalDate,
            notes = notes,
            buildingUuid = buildingUuid
        )
        val postResponse = restTemplate.postForEntity(
            "http://localhost:$port/api/budgets",
            createDto,
            BudgetResponseDto::class.java
        )
        assertEquals(201, postResponse.statusCode.value())
        return postResponse.body!!
    }

    @Test
    fun `should create budget`() {
        val created = createBudget(year = 2025, notes = "Budget for 2025")
        assertEquals(2025, created.year)
        assertEquals("Budget for 2025", created.notes)
        assertEquals(BigDecimal("10000.00"), created.totalBudget)
    }

    @Test
    fun `should fetch budget by UUID`() {
        val created = createBudget()
        val getResponse = restTemplate.getForEntity(
            "http://localhost:$port/api/budgets/${created.budgetUuid}",
            BudgetResponseDto::class.java
        )
        assertEquals(200, getResponse.statusCode.value())
        assertEquals(created.budgetUuid, getResponse.body!!.budgetUuid)
    }

    @Test
    fun `should fetch all budgets`() {
        val created = createBudget(notes = "Fetch all budgets test")
        val getResponse = restTemplate.getForEntity(
            "http://localhost:$port/api/budgets",
            Array<BudgetResponseDto>::class.java
        )
        assertEquals(200, getResponse.statusCode.value())
        assertTrue(getResponse.body!!.any { it.notes == "Fetch all budgets test" })
    }

    @Test
    fun `should update budget`() {
        val created = createBudget()
        val updateDto = BudgetUpdateDto(
            year = 2026,
            totalBudget = BigDecimal("15000.00"),
            maintenanceBudget = BigDecimal("4000.00"),
            inventoryBudget = BigDecimal("3000.00"),
            approvalDate = LocalDate.now(),
            notes = "Updated budget",
            inventorySpent = BigDecimal("1000.00"),
            maintenanceSpent = BigDecimal("500.00"),
            buildingUuid = created.buildingUuid
        )
        val updateEntity = HttpEntity(updateDto)
        val updateResponse = restTemplate.exchange(
            "http://localhost:$port/api/budgets/${created.budgetUuid}",
            HttpMethod.PUT,
            updateEntity,
            BudgetResponseDto::class.java
        )
        assertEquals(200, updateResponse.statusCode.value())
        assertEquals(2026, updateResponse.body!!.year)
        assertEquals("Updated budget", updateResponse.body!!.notes)
        assertEquals(BigDecimal("15000.00"), updateResponse.body!!.totalBudget)
    }

    @Test
    fun `should delete budget`() {
        val created = createBudget()
        val deleteResponse = restTemplate.exchange(
            "http://localhost:$port/api/budgets/${created.budgetUuid}",
            HttpMethod.DELETE,
            null,
            Void::class.java
        )
        assertEquals(204, deleteResponse.statusCode.value())

        val getAfterDelete = restTemplate.getForEntity(
            "http://localhost:$port/api/budgets/${created.budgetUuid}",
            String::class.java 
        )
        assertEquals(404, getAfterDelete.statusCode.value())
    }

    @Test
    fun `should fetch budgets by building UUID`() {
        val buildingUuid = UUID.randomUUID()
        val created1 = createBudget(buildingUuid = buildingUuid, notes = "BuildingBudget1")
        val created2 = createBudget(buildingUuid = buildingUuid, notes = "BuildingBudget2")
        val getResponse = restTemplate.getForEntity(
            "http://localhost:$port/api/budgets/building/$buildingUuid",
            Array<BudgetResponseDto>::class.java
        )
        assertEquals(200, getResponse.statusCode.value())
        assertTrue(getResponse.body!!.any { it.notes == "BuildingBudget1" })
        assertTrue(getResponse.body!!.any { it.notes == "BuildingBudget2" })
    }

    @Test
    fun `should fetch budgets by year`() {
        val created = createBudget(year = 2030, notes = "YearBudgetTest")
        val getResponse = restTemplate.getForEntity(
            "http://localhost:$port/api/budgets/year/2030",
            Array<BudgetResponseDto>::class.java
        )
        assertEquals(200, getResponse.statusCode.value())
        assertTrue(getResponse.body!!.any { it.notes == "YearBudgetTest" })
    }

    @Test
    fun `should fetch budget by building and year`() {
        val buildingUuid = UUID.randomUUID()
        val created = createBudget(buildingUuid = buildingUuid, year = 2040, notes = "BuildingYearBudget")
        val getResponse = restTemplate.getForEntity(
            "http://localhost:$port/api/budgets/building/$buildingUuid/year/2040",
            BudgetResponseDto::class.java
        )
        assertEquals(200, getResponse.statusCode.value())
        assertEquals("BuildingYearBudget", getResponse.body!!.notes)
    }
}