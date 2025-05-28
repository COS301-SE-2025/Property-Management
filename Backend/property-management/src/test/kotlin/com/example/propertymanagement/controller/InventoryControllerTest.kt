package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.InventoryItemRequest
import com.example.propertymanagement.dto.InventoryUsageRequest
import com.example.propertymanagement.model.InventoryItem
import com.example.propertymanagement.service.InventoryService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.Mockito.doNothing
import org.mockito.kotlin.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(InventoryController::class)
class InventoryControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var inventoryService: InventoryService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `should return all inventory items`() {
        val items =
            listOf(
                InventoryItem(
                    itemId = 1,
                    name = "Item1",
                    unit = "pcs",
                    quantityInStock = 100,
                    buildingId = 1,
                ),
                InventoryItem(
                    itemId = 2,
                    name = "Item2",
                    unit = "kg",
                    quantityInStock = 50,
                    buildingId = 2,
                ),
            )
        given(inventoryService.getAll()).willReturn(items)

        mockMvc.perform(get("/api/inventory"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(2))
    }

    @Test
    fun `should return inventory item by ID`() {
        val item =
            InventoryItem(
                itemId = 1,
                name = "Item1",
                unit = "pcs",
                quantityInStock = 100,
                buildingId = 1,
            )
        given(inventoryService.getById(1)).willReturn(item)

        mockMvc.perform(get("/api/inventory/1"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.itemId").value(1))
            .andExpect(jsonPath("$.name").value("Item1"))
    }

    @Test
    fun `should return 404 for non-existent inventory item`() {
        given(inventoryService.getById(999)).willThrow(NoSuchElementException("Item not found: 999"))

        mockMvc.perform(get("/api/inventory/999"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Item not found: 999"))
    }

    @Test
    fun `should update inventory item`() {
        val updatedItem =
            InventoryItem(
                itemId = 1,
                name = "Updated Item",
                unit = "pcs",
                quantityInStock = 150,
                buildingId = 1,
            )
        given(inventoryService.update(1, updatedItem)).willReturn(updatedItem)

        mockMvc.perform(
            put("/api/inventory/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedItem)),
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.itemId").value(1))
            .andExpect(jsonPath("$.name").value("Updated Item"))
            .andExpect(jsonPath("$.quantityInStock").value(150))
            .andExpect(jsonPath("$.buildingId").value(1))
    }

    @Test
    fun `should return 404 when updating non-existent inventory item`() {
        val updatedItem =
            InventoryItem(
                itemId = 999,
                name = "Non-existent Item",
                unit = "pcs",
                quantityInStock = 0,
                buildingId = 1,
            )
        given(inventoryService.update(999, updatedItem)).willThrow(NoSuchElementException("Item not found: 999"))

        mockMvc.perform(
            put("/api/inventory/999")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedItem)),
        )
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Item not found: 999"))
    }

    @Test
    fun `should return 400 when updating inventory item with negative quantity`() {
        val invalidItem =
            InventoryItem(
                itemId = 1,
                name = "Invalid Item",
                unit = "pcs",
                quantityInStock = -10,
                buildingId = 1,
            )
        given(inventoryService.update(1, invalidItem)).willThrow(IllegalArgumentException("Quantity in stock cannot be negative"))

        mockMvc.perform(
            put("/api/inventory/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidItem)),
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.error").value("Quantity in stock cannot be negative"))
    }

    @Test
    fun `should delete inventory item`() {
        mockMvc.perform(delete("/api/inventory/1"))
            .andExpect(status().isNoContent)
    }

    @Test
    fun `should return 404 when deleting non-existent inventory item`() {
        given(inventoryService.delete(999)).willThrow(NoSuchElementException("Item with ID 999 not found"))

        mockMvc.perform(delete("/api/inventory/999"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Item with ID 999 not found"))
    }

    @Test
    fun `should add or update inventory item`() {
        val request =
            InventoryItemRequest(
                name = "New Item",
                quantity = 100,
                price = 10.0,
                building_id = 1,
            )

        doNothing().`when`(inventoryService).addOrUpdateItem(request)

        mockMvc.perform(
            post("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)),
        )
            .andExpect(status().isOk)
            .andExpect(content().string("Item processed successfully"))
    }

    @Test
    fun `should return 404 when adding or updating inventory item with negative quantity`() {
        val request =
            InventoryItemRequest(
                name = "Invalid Item",
                quantity = -10,
                price = 10.0,
                building_id = 1,
            )
        given(inventoryService.addOrUpdateItem(request)).willThrow(IllegalArgumentException("Quantity cannot be negative"))

        mockMvc.perform(
            post("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)),
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.error").value("Quantity cannot be negative"))
    }

    @Test
    fun `should use inventory item successfully`() {
        val request =
            InventoryUsageRequest(
                id = 1,
                name = "Item1",
                unit = 10,
            )
        val updatedItem =
            InventoryItem(
                itemId = 1,
                name = "Item1",
                unit = "pcs",
                quantityInStock = 90,
                buildingId = 1,
            )
        given(inventoryService.useInventoryItem(request)).willReturn(updatedItem)

        mockMvc.perform(
            post("/api/inventory/use")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)),
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.itemId").value(1))
            .andExpect(jsonPath("$.quantityInStock").value(90))
    }

    @Test
    fun `should return 404 when using inventory item with zero or negative quantity`() {
        val request =
            InventoryUsageRequest(
                id = 1,
                name = "Item1",
                unit = 0,
            )
        given(inventoryService.useInventoryItem(request)).willThrow(IllegalArgumentException("Quantity must be greater than zero"))

        mockMvc.perform(
            post("/api/inventory/use")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)),
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.error").value("Quantity must be greater than zero"))
    }
}