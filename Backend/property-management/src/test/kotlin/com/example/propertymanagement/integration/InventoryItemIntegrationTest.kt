package com.example.propertymanagement.integration

import com.example.propertymanagement.dto.CreateInventoryItemDto
import com.example.propertymanagement.dto.InventoryItemResponseDto
import com.example.propertymanagement.dto.UpdateInventoryItemDto
import com.example.propertymanagement.dto.QuantityUpdateDto
import org.junit.jupiter.api.Assertions.assertEquals
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
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.containers.PostgreSQLContainer
import java.util.UUID

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integration")
@Testcontainers
class InventoryItemIntegrationTest {

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

    // Helper: create a building and return its UUID (reuse your building test helper if available)
    fun createBuildingAndGetUuid(): UUID {
        val buildingResponse = restTemplate.postForEntity(
            "http://localhost:$port/api/buildings",
            mapOf(
                "name" to "InventoryTestBuilding",
                "address" to "123 Test Lane",
                "type" to "Warehouse",
                "propertyValue" to 100000.0,
                "primaryContractors" to arrayOf(1),
                "latestInspectionDate" to "2024-01-01",
                "complexName" to "Inventory Complex",
                "trusteeUuid" to UUID.randomUUID(),
                "propertyImageId" to null
            ),
            Map::class.java
        )
        return UUID.fromString(buildingResponse.body!!["buildingUuid"].toString())
    }

    @Test
    fun `should create inventory item`() {
        val buildingUuid = createBuildingAndGetUuid()
        val createDto = CreateInventoryItemDto(
            name = "Wrench",
            unit = "pcs",
            quantity = 10,
            buildingUuid = buildingUuid
        )
        val postResponse = restTemplate.postForEntity(
            "http://localhost:$port/api/inventory",
            createDto,
            InventoryItemResponseDto::class.java
        )
        assertEquals(201, postResponse.statusCode.value())
        assertEquals("Wrench", postResponse.body!!.name)
        assertEquals(10, postResponse.body!!.quantityInStock)
    }

    @Test
    fun `should get all inventory items`() {
        val buildingUuid = createBuildingAndGetUuid()
        val createDto = CreateInventoryItemDto(
            name = "Hammer",
            unit = "pcs",
            quantity = 5,
            buildingUuid = buildingUuid
        )
        restTemplate.postForEntity(
            "http://localhost:$port/api/inventory",
            createDto,
            InventoryItemResponseDto::class.java
        )
        val getResponse = restTemplate.getForEntity(
            "http://localhost:$port/api/inventory",
            Array<InventoryItemResponseDto>::class.java
        )
        assertEquals(200, getResponse.statusCode.value())
        assertTrue(getResponse.body!!.any { it.name == "Hammer" })
    }

    @Test
    fun `should get inventory item by UUID`() {
        val buildingUuid = createBuildingAndGetUuid()
        val createDto = CreateInventoryItemDto(
            name = "Screwdriver",
            unit = "pcs",
            quantity = 15,
            buildingUuid = buildingUuid
        )
        val postResponse = restTemplate.postForEntity(
            "http://localhost:$port/api/inventory",
            createDto,
            InventoryItemResponseDto::class.java
        )
        val itemUuid = postResponse.body!!.itemUuid
        val getById = restTemplate.getForEntity(
            "http://localhost:$port/api/inventory/$itemUuid",
            InventoryItemResponseDto::class.java
        )
        assertEquals(200, getById.statusCode.value())
        assertEquals("Screwdriver", getById.body!!.name)
    }

    @Test
    fun `should get inventory items by building UUID`() {
        val buildingUuid = createBuildingAndGetUuid()
        val createDto = CreateInventoryItemDto(
            name = "Drill",
            unit = "pcs",
            quantity = 3,
            buildingUuid = buildingUuid
        )
        restTemplate.postForEntity(
            "http://localhost:$port/api/inventory",
            createDto,
            InventoryItemResponseDto::class.java
        )
        val getByBuilding = restTemplate.getForEntity(
            "http://localhost:$port/api/inventory/building/$buildingUuid",
            Array<InventoryItemResponseDto>::class.java
        )
        assertEquals(200, getByBuilding.statusCode.value())
        assertTrue(getByBuilding.body!!.any { it.name == "Drill" })
    }

    @Test
    fun `should update inventory item`() {
        val buildingUuid = createBuildingAndGetUuid()
        val createDto = CreateInventoryItemDto(
            name = "Saw",
            unit = "pcs",
            quantity = 2,
            buildingUuid = buildingUuid
        )
        val postResponse = restTemplate.postForEntity(
            "http://localhost:$port/api/inventory",
            createDto,
            InventoryItemResponseDto::class.java
        )
        val itemUuid = postResponse.body!!.itemUuid
        val updateDto = UpdateInventoryItemDto(
            name = "Electric Saw",
            unit = "pcs",
            quantity = 4
        )
        val updateEntity = HttpEntity(updateDto)
        val updateResponse = restTemplate.exchange(
            "http://localhost:$port/api/inventory/$itemUuid",
            HttpMethod.PUT,
            updateEntity,
            InventoryItemResponseDto::class.java
        )
        assertEquals(200, updateResponse.statusCode.value())
        assertEquals("Electric Saw", updateResponse.body!!.name)
        assertEquals(4, updateResponse.body!!.quantityInStock)
    }

    @Test
    fun `should set inventory item quantity`() {
        val buildingUuid = createBuildingAndGetUuid()
        val createDto = CreateInventoryItemDto(
            name = "Paint",
            unit = "liters",
            quantity = 5,
            buildingUuid = buildingUuid
        )
        val postResponse = restTemplate.postForEntity(
            "http://localhost:$port/api/inventory",
            createDto,
            InventoryItemResponseDto::class.java
        )
        val itemUuid = postResponse.body!!.itemUuid
        val patchDto = QuantityUpdateDto(
            quantity = 20,
            operation = "SET"
        )
        val patchEntity = HttpEntity(patchDto)
        val patchResponse = restTemplate.exchange(
            "http://localhost:$port/api/inventory/$itemUuid/quantity",
            HttpMethod.PATCH,
            patchEntity,
            InventoryItemResponseDto::class.java
        )
        assertEquals(200, patchResponse.statusCode.value())
        assertEquals(20, patchResponse.body!!.quantityInStock)
    }

    @Test
    fun `should add to inventory item quantity`() {
        val buildingUuid = createBuildingAndGetUuid()
        val createDto = CreateInventoryItemDto(
            name = "Bolts",
            unit = "pcs",
            quantity = 10,
            buildingUuid = buildingUuid
        )
        val postResponse = restTemplate.postForEntity(
            "http://localhost:$port/api/inventory",
            createDto,
            InventoryItemResponseDto::class.java
        )
        val itemUuid = postResponse.body!!.itemUuid
        val patchDto = QuantityUpdateDto(
            quantity = 5,
            operation = "ADD"
        )
        val patchEntity = HttpEntity(patchDto)
        val patchResponse = restTemplate.exchange(
            "http://localhost:$port/api/inventory/$itemUuid/quantity",
            HttpMethod.PATCH,
            patchEntity,
            InventoryItemResponseDto::class.java
        )
        assertEquals(200, patchResponse.statusCode.value())
        assertEquals(15, patchResponse.body!!.quantityInStock)
    }

    @Test
    fun `should subtract from inventory item quantity`() {
        val buildingUuid = createBuildingAndGetUuid()
        val createDto = CreateInventoryItemDto(
            name = "Nails",
            unit = "pcs",
            quantity = 30,
            buildingUuid = buildingUuid
        )
        val postResponse = restTemplate.postForEntity(
            "http://localhost:$port/api/inventory",
            createDto,
            InventoryItemResponseDto::class.java
        )
        val itemUuid = postResponse.body!!.itemUuid
        val patchDto = QuantityUpdateDto(
            quantity = 10,
            operation = "SUBTRACT"
        )
        val patchEntity = HttpEntity(patchDto)
        val patchResponse = restTemplate.exchange(
            "http://localhost:$port/api/inventory/$itemUuid/quantity",
            HttpMethod.PATCH,
            patchEntity,
            InventoryItemResponseDto::class.java
        )
        assertEquals(200, patchResponse.statusCode.value())
        assertEquals(20, patchResponse.body!!.quantityInStock)
    }

    @Test
    fun `should delete inventory item`() {
        val buildingUuid = createBuildingAndGetUuid()
        val createDto = CreateInventoryItemDto(
            name = "Glue",
            unit = "bottles",
            quantity = 8,
            buildingUuid = buildingUuid
        )
        val postResponse = restTemplate.postForEntity(
            "http://localhost:$port/api/inventory",
            createDto,
            InventoryItemResponseDto::class.java
        )
        val itemUuid = postResponse.body!!.itemUuid
        val deleteResponse = restTemplate.exchange(
            "http://localhost:$port/api/inventory/$itemUuid",
            HttpMethod.DELETE,
            null,
            Void::class.java
        )
        assertEquals(204, deleteResponse.statusCode.value())

        val getAfterDelete = restTemplate.getForEntity(
            "http://localhost:$port/api/inventory/$itemUuid",
            String::class.java
        )
        assertEquals(404, getAfterDelete.statusCode.value())
    }
}