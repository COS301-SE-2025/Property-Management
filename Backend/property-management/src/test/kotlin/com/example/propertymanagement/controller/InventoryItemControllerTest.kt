package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.CreateInventoryItemDto
import com.example.propertymanagement.dto.InventoryItemResponseDto
import com.example.propertymanagement.dto.QuantityUpdateDto
import com.example.propertymanagement.dto.UpdateInventoryItemDto
import com.example.propertymanagement.service.InventoryItemService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.eq
import org.mockito.kotlin.whenever
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.delete
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.patch
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.put
import java.util.UUID

@WebMvcTest(InventoryItemController::class)
class InventoryItemControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @MockBean
    private lateinit var inventoryItemService: InventoryItemService

    private val buildingUuid = UUID.randomUUID()
    private val itemUuid = UUID.randomUUID()

    private fun sampleResponseDto() =
        InventoryItemResponseDto(
            itemUuid = itemUuid,
            name = "Cement",
            unit = "Bags",
            quantityInStock = 50,
            buildingUuidFk = buildingUuid,
        )

    @Test
    fun `getAllInventoryItems returns 200 with list`() {
        whenever(inventoryItemService.getAllInventoryItems()).thenReturn(listOf(sampleResponseDto()))

        mockMvc.get("/api/inventory")
            .andExpect {
                status { isOk() }
                jsonPath("$.size()") { value(1) }
                jsonPath("$[0].itemUuid") { value(itemUuid.toString()) }
            }
    }

    @Test
    fun `getInventoryItemsByBuilding returns 200 with list`() {
        whenever(inventoryItemService.getInventoryItemsByBuildingUuid(buildingUuid)).thenReturn(listOf(sampleResponseDto()))

        mockMvc.get("/api/inventory/building/$buildingUuid")
            .andExpect {
                status { isOk() }
                jsonPath("$.size()") { value(1) }
                jsonPath("$[0].buildingUuidFk") { value(buildingUuid.toString()) }
            }
    }

    @Test
    fun `getInventoryItemByUuid returns 200 with item`() {
        whenever(inventoryItemService.getInventoryItemByUuid(itemUuid)).thenReturn(sampleResponseDto())

        mockMvc.get("/api/inventory/$itemUuid")
            .andExpect {
                status { isOk() }
                jsonPath("$.itemUuid") { value(itemUuid.toString()) }
            }
    }

    @Test
    fun `createInventoryItem returns 201 with created item`() {
        val createDto =
            CreateInventoryItemDto(
                name = "Cement",
                unit = "Bags",
                quantity = 50,
                buildingUuid = buildingUuid,
            )

        whenever(inventoryItemService.createInventoryItem(any())).thenReturn(sampleResponseDto())

        mockMvc.post("/api/inventory") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(createDto)
        }.andExpect {
            status { isCreated() }
            jsonPath("$.itemUuid") { value(itemUuid.toString()) }
        }
    }

    @Test
    fun `updateInventoryItem returns 200 with updated item`() {
        val updateDto =
            UpdateInventoryItemDto(
                name = "Cement - Updated",
                unit = "Bags",
                quantity = 60,
            )

        whenever(inventoryItemService.updateInventoryItem(eq(itemUuid), any())).thenReturn(sampleResponseDto())

        mockMvc.put("/api/inventory/$itemUuid") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(updateDto)
        }.andExpect {
            status { isOk() }
            jsonPath("$.itemUuid") { value(itemUuid.toString()) }
        }
    }

    @Test
    fun `updateQuantity returns 200 with updated item`() {
        val quantityDto =
            QuantityUpdateDto(
                quantity = 10,
                operation = "ADD",
            )

        whenever(inventoryItemService.updateQuantity(eq(itemUuid), any())).thenReturn(sampleResponseDto())

        mockMvc.patch("/api/inventory/$itemUuid/quantity") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(quantityDto)
        }.andExpect {
            status { isOk() }
            jsonPath("$.itemUuid") { value(itemUuid.toString()) }
        }
    }

    @Test
    fun `deleteInventoryItem returns 204`() {
        mockMvc.delete("/api/inventory/$itemUuid")
            .andExpect {
                status { isNoContent() }
            }
    }
}
