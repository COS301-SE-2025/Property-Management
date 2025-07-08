package com.example.propertymanagement.integration

import com.example.propertymanagement.dto.ApprovalRequest
import com.example.propertymanagement.dto.BuildingCreateDto
import com.example.propertymanagement.dto.BuildingResponseDto
import com.example.propertymanagement.dto.CreateInventoryItemDto
import com.example.propertymanagement.dto.CreateInventoryUsageRequest
import com.example.propertymanagement.dto.InventoryItemResponseDto
import com.example.propertymanagement.dto.InventoryUsageResponse
import com.example.propertymanagement.dto.UpdateInventoryUsageRequest
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import java.sql.Date
import java.time.LocalDate
import java.util.UUID

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integration")
@Testcontainers
class InventoryUsageIntegrationTest {
    companion object {
        @Container
        val postgres =
            PostgreSQLContainer<Nothing>("postgres:16").apply {
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

    // Helper: create inventory item and return its UUID
    fun createInventoryItemAndGetUuid(): UUID {
        val buildingDto =
            BuildingCreateDto(
                name = "UsageTestBuilding",
                address = "456 Test Ave",
                type = "Warehouse",
                propertyValue = 200000.0,
                primaryContractor = UUID.randomUUID(),
                latestInspectionDate = LocalDate.of(2024, 2, 2),
                area = 2000.0,
                trusteeUuid = UUID.randomUUID(),
                coporateUuid = null,
                propertyImageId = null,
            )
        val buildingResponse =
            restTemplate.postForEntity(
                "http://localhost:$port/api/buildings",
                buildingDto,
                BuildingResponseDto::class.java,
            )
        val buildingUuid = buildingResponse.body?.buildingUuid!!
        val itemDto =
            CreateInventoryItemDto(
                name = "TestItem",
                unit = "pcs",
                quantity = 100,
                buildingUuid = buildingUuid,
                price = 10.0.toBigDecimal(),
            )
        val itemResponse =
            restTemplate.postForEntity(
                "http://localhost:$port/api/inventory",
                itemDto,
                InventoryItemResponseDto::class.java,
            )
        return itemResponse.body!!.itemUuid
    }

    // Helper: create a random task UUID (simulate task exists)
    fun createTaskUuid(): UUID = UUID.randomUUID()

    // Helper: create a random contractor UUID (simulate contractor exists)
    fun createContractorUuid(): UUID = UUID.randomUUID()

    @Test
    fun `should create inventory usage`() {
        val itemUuid = createInventoryItemAndGetUuid()
        val taskUuid = createTaskUuid()
        val contractorUuid = createContractorUuid()
        val usageDto =
            CreateInventoryUsageRequest(
                itemUuid = itemUuid,
                taskUuid = taskUuid,
                usedByContractorUuid = contractorUuid,
                quantityUsed = 5,
            )
        val postResponse =
            restTemplate.postForEntity(
                "http://localhost:$port/api/inventory-usage",
                usageDto,
                InventoryUsageResponse::class.java,
            )
        assertEquals(201, postResponse.statusCode.value())
        assertEquals(itemUuid, postResponse.body!!.itemUuid)
        assertEquals(5, postResponse.body!!.quantityUsed)
        assertFalse(postResponse.body!!.trusteeApproved)
    }

    @Test
    fun `should get all inventory usage paged`() {
        val itemUuid = createInventoryItemAndGetUuid()
        val taskUuid = createTaskUuid()
        val contractorUuid = createContractorUuid()
        val usageDto =
            CreateInventoryUsageRequest(
                itemUuid = itemUuid,
                taskUuid = taskUuid,
                usedByContractorUuid = contractorUuid,
                quantityUsed = 7,
            )
        restTemplate.postForEntity(
            "http://localhost:$port/api/inventory-usage",
            usageDto,
            InventoryUsageResponse::class.java,
        )
        val getResponse =
            restTemplate.getForEntity(
                "http://localhost:$port/api/inventory-usage",
                String::class.java,
            )
        assertEquals(200, getResponse.statusCode.value())
        assertTrue(getResponse.body!!.contains("quantityUsed"))
    }

    @Test
    fun `should get inventory usage by id`() {
        val itemUuid = createInventoryItemAndGetUuid()
        val taskUuid = createTaskUuid()
        val contractorUuid = createContractorUuid()
        val usageDto =
            CreateInventoryUsageRequest(
                itemUuid = itemUuid,
                taskUuid = taskUuid,
                usedByContractorUuid = contractorUuid,
                quantityUsed = 3,
            )
        val postResponse =
            restTemplate.postForEntity(
                "http://localhost:$port/api/inventory-usage",
                usageDto,
                InventoryUsageResponse::class.java,
            )
        val usageUuid = postResponse.body!!.usageUuid
        val getById =
            restTemplate.getForEntity(
                "http://localhost:$port/api/inventory-usage/$usageUuid",
                InventoryUsageResponse::class.java,
            )
        assertEquals(200, getById.statusCode.value())
        assertEquals(3, getById.body!!.quantityUsed)
    }

    @Test
    fun `should update inventory usage`() {
        val itemUuid = createInventoryItemAndGetUuid()
        val taskUuid = createTaskUuid()
        val contractorUuid = createContractorUuid()
        val usageDto =
            CreateInventoryUsageRequest(
                itemUuid = itemUuid,
                taskUuid = taskUuid,
                usedByContractorUuid = contractorUuid,
                quantityUsed = 10,
            )
        val postResponse =
            restTemplate.postForEntity(
                "http://localhost:$port/api/inventory-usage",
                usageDto,
                InventoryUsageResponse::class.java,
            )
        val usageUuid = postResponse.body!!.usageUuid
        val updateDto =
            UpdateInventoryUsageRequest(
                quantityUsed = 20,
                trusteeApproved = true,
                approvalDate = Date.valueOf(LocalDate.now()),
            )
        val updateEntity = HttpEntity(updateDto)
        val updateResponse =
            restTemplate.exchange(
                "http://localhost:$port/api/inventory-usage/$usageUuid",
                HttpMethod.PUT,
                updateEntity,
                InventoryUsageResponse::class.java,
            )
        assertEquals(200, updateResponse.statusCode.value())
        assertEquals(20, updateResponse.body!!.quantityUsed)
        assertTrue(updateResponse.body!!.trusteeApproved)
    }

    @Test
    fun `should approve inventory usage`() {
        val itemUuid = createInventoryItemAndGetUuid()
        val taskUuid = createTaskUuid()
        val contractorUuid = createContractorUuid()
        val usageDto =
            CreateInventoryUsageRequest(
                itemUuid = itemUuid,
                taskUuid = taskUuid,
                usedByContractorUuid = contractorUuid,
                quantityUsed = 8,
            )
        val postResponse =
            restTemplate.postForEntity(
                "http://localhost:$port/api/inventory-usage",
                usageDto,
                InventoryUsageResponse::class.java,
            )
        val usageUuid = postResponse.body!!.usageUuid
        val approvalDto =
            ApprovalRequest(
                trusteeApproved = true,
                approvalDate = Date.valueOf(LocalDate.now()),
            )
        val approvalEntity = HttpEntity(approvalDto)
        val patchResponse =
            restTemplate.exchange(
                "http://localhost:$port/api/inventory-usage/$usageUuid/approval",
                HttpMethod.PATCH,
                approvalEntity,
                InventoryUsageResponse::class.java,
            )
        assertEquals(200, patchResponse.statusCode.value())
        assertTrue(patchResponse.body!!.trusteeApproved)
        assertNotNull(patchResponse.body!!.approvalDate)
    }

    @Test
    fun `should delete inventory usage`() {
        val itemUuid = createInventoryItemAndGetUuid()
        val taskUuid = createTaskUuid()
        val contractorUuid = createContractorUuid()
        val usageDto =
            CreateInventoryUsageRequest(
                itemUuid = itemUuid,
                taskUuid = taskUuid,
                usedByContractorUuid = contractorUuid,
                quantityUsed = 12,
            )
        val postResponse =
            restTemplate.postForEntity(
                "http://localhost:$port/api/inventory-usage",
                usageDto,
                InventoryUsageResponse::class.java,
            )
        val usageUuid = postResponse.body!!.usageUuid
        val deleteResponse =
            restTemplate.exchange(
                "http://localhost:$port/api/inventory-usage/$usageUuid",
                HttpMethod.DELETE,
                null,
                String::class.java,
            )
        assertEquals(200, deleteResponse.statusCode.value())
        val getAfterDelete =
            restTemplate.getForEntity(
                "http://localhost:$port/api/inventory-usage/$usageUuid",
                String::class.java,
            )
        assertEquals(404, getAfterDelete.statusCode.value())
    }
}
