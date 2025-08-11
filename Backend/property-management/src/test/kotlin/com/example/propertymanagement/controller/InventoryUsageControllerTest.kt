package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.AssignContractorRequest
import com.example.propertymanagement.dto.CreateInventoryUsageRequest
import com.example.propertymanagement.dto.InventoryUsageResponse
import com.example.propertymanagement.dto.UpdateInventoryUsageRequest
import com.example.propertymanagement.service.InventoryUsageService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.kotlin.eq
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import java.sql.Date
import java.util.UUID

@WebMvcTest(controllers = [InventoryUsageController::class])
class InventoryUsageControllerTest(
    @Autowired val mockMvc: MockMvc,
    @Autowired val objectMapper: ObjectMapper,
) {
    @MockBean
    lateinit var inventoryUsageService: InventoryUsageService

    private val usageUuid = UUID.randomUUID()
    private val itemUuid = UUID.randomUUID()
    private val taskUuid = UUID.randomUUID()
    private val contractorUuid = UUID.randomUUID()
    private val approvalDate = Date(System.currentTimeMillis())

    private fun createSampleResponse(): InventoryUsageResponse =
        InventoryUsageResponse(
            usageUuid = usageUuid,
            itemUuid = itemUuid,
            taskUuid = taskUuid,
            usedByContractorUuid = contractorUuid,
            quantityUsed = 10,
            trusteeApproved = false,
            approvalDate = null,
        )

    @Test
    fun `createInventoryUsage should return created response when successful`() {
        val request =
            CreateInventoryUsageRequest(
                itemUuid = itemUuid,
                taskUuid = taskUuid,
                usedByContractorUuid = contractorUuid,
                quantityUsed = 10,
            )
        val response = createSampleResponse()

        Mockito.`when`(inventoryUsageService.createInventoryUsage(eq(request))).thenReturn(response)

        mockMvc
            .perform(
                MockMvcRequestBuilders
                    .post("/api/inventory-usage")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(MockMvcResultMatchers.status().isCreated)
            .andExpect(MockMvcResultMatchers.jsonPath("$.usageUuid").value(usageUuid.toString()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.itemUuid").value(itemUuid.toString()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.quantityUsed").value(10))

        Mockito.verify(inventoryUsageService).createInventoryUsage(eq(request))
    }

    @Test
    fun `createInventoryUsage should return bad request when service throws exception`() {
        val request =
            CreateInventoryUsageRequest(
                itemUuid = itemUuid,
                taskUuid = taskUuid,
                usedByContractorUuid = contractorUuid,
                quantityUsed = 10,
            )

        Mockito
            .`when`(inventoryUsageService.createInventoryUsage(eq(request)))
            .thenThrow(RuntimeException("Service error"))

        mockMvc
            .perform(
                MockMvcRequestBuilders
                    .post("/api/inventory-usage")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(MockMvcResultMatchers.status().isBadRequest)

        Mockito.verify(inventoryUsageService).createInventoryUsage(eq(request))
    }

    @Test
    fun `getAllInventoryUsage should return internal server error when service throws exception`() {
        val pageable = PageRequest.of(0, 10, Sort.by("usageUuid").ascending())

        Mockito
            .`when`(inventoryUsageService.getAllInventoryUsage(eq(pageable)))
            .thenThrow(RuntimeException("Service error"))

        mockMvc
            .perform(
                MockMvcRequestBuilders
                    .get("/api/inventory-usage")
                    .param("page", "0")
                    .param("size", "10")
                    .param("sortBy", "usageUuid")
                    .param("sortDir", "asc"),
            ).andExpect(MockMvcResultMatchers.status().isInternalServerError)

        Mockito.verify(inventoryUsageService).getAllInventoryUsage(eq(pageable))
    }

    @Test
    fun `getInventoryUsageById should return usage when found`() {
        val response = createSampleResponse()

        Mockito.`when`(inventoryUsageService.getInventoryUsageById(usageUuid)).thenReturn(response)

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/$usageUuid"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.usageUuid").value(usageUuid.toString()))

        Mockito.verify(inventoryUsageService).getInventoryUsageById(usageUuid)
    }

    @Test
    fun `getInventoryUsageById should return not found when usage not exists`() {
        Mockito
            .`when`(inventoryUsageService.getInventoryUsageById(usageUuid))
            .thenThrow(IllegalArgumentException("Usage not found"))

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/$usageUuid"))
            .andExpect(MockMvcResultMatchers.status().isNotFound)

        Mockito.verify(inventoryUsageService).getInventoryUsageById(usageUuid)
    }

    @Test
    fun `getInventoryUsageById should return internal server error when service throws unexpected exception`() {
        Mockito
            .`when`(inventoryUsageService.getInventoryUsageById(usageUuid))
            .thenThrow(RuntimeException("Unexpected error"))

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/$usageUuid"))
            .andExpect(MockMvcResultMatchers.status().isInternalServerError)

        Mockito.verify(inventoryUsageService).getInventoryUsageById(usageUuid)
    }

    @Test
    fun `updateInventoryUsage should return not found when usage not exists`() {
        val request =
            UpdateInventoryUsageRequest(
                quantityUsed = 15,
                trusteeApproved = false,
                approvalDate = null,
            )

        val usageUuid1 = UUID.randomUUID()

        Mockito
            .`when`(inventoryUsageService.updateInventoryUsage(eq(usageUuid1), eq(request)))
            .thenThrow(IllegalArgumentException("Usage not found"))

        mockMvc
            .perform(
                MockMvcRequestBuilders
                    .put("/api/inventory-usage/$usageUuid1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(MockMvcResultMatchers.status().isNotFound)

        Mockito.verify(inventoryUsageService).updateInventoryUsage(eq(usageUuid1), eq(request))
    }

    @Test
    fun `deleteInventoryUsage should return success message when successful`() {
        Mockito.`when`(inventoryUsageService.deleteInventoryUsage(usageUuid)).thenReturn(true)

        mockMvc
            .perform(MockMvcRequestBuilders.delete("/api/inventory-usage/$usageUuid"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Inventory usage deleted successfully"))

        Mockito.verify(inventoryUsageService).deleteInventoryUsage(usageUuid)
    }

    @Test
    fun `deleteInventoryUsage should return not found when delete fails`() {
        Mockito.`when`(inventoryUsageService.deleteInventoryUsage(usageUuid)).thenReturn(false)

        mockMvc
            .perform(MockMvcRequestBuilders.delete("/api/inventory-usage/$usageUuid"))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect(MockMvcResultMatchers.jsonPath("$.error").value("Failed to delete inventory usage"))

        Mockito.verify(inventoryUsageService).deleteInventoryUsage(usageUuid)
    }

    @Test
    fun `deleteInventoryUsage should return not found when service throws IllegalArgumentException`() {
        Mockito
            .`when`(inventoryUsageService.deleteInventoryUsage(usageUuid))
            .thenThrow(IllegalArgumentException("Usage not found"))

        mockMvc
            .perform(MockMvcRequestBuilders.delete("/api/inventory-usage/$usageUuid"))
            .andExpect(MockMvcResultMatchers.status().isNotFound)
            .andExpect(MockMvcResultMatchers.jsonPath("$.error").value("Usage not found"))

        Mockito.verify(inventoryUsageService).deleteInventoryUsage(usageUuid)
    }

    @Test
    fun `deleteInventoryUsage should return internal server error when service throws unexpected exception`() {
        Mockito
            .`when`(inventoryUsageService.deleteInventoryUsage(usageUuid))
            .thenThrow(RuntimeException("Unexpected error"))

        mockMvc
            .perform(MockMvcRequestBuilders.delete("/api/inventory-usage/$usageUuid"))
            .andExpect(MockMvcResultMatchers.status().isInternalServerError)
            .andExpect(MockMvcResultMatchers.jsonPath("$.error").value("Internal server error"))

        Mockito.verify(inventoryUsageService).deleteInventoryUsage(usageUuid)
    }

    @Test
    fun `getUsageByItemUuid should return list of usages`() {
        val response = listOf(createSampleResponse())

        Mockito.`when`(inventoryUsageService.getUsageByItemUuid(itemUuid)).thenReturn(response)

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/by-item/$itemUuid"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].itemUuid").value(itemUuid.toString()))

        Mockito.verify(inventoryUsageService).getUsageByItemUuid(itemUuid)
    }

    @Test
    fun `getUsageByTaskUuid should return list of usages`() {
        val response = listOf(createSampleResponse())

        Mockito.`when`(inventoryUsageService.getUsageByTaskUuid(taskUuid)).thenReturn(response)

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/by-task/$taskUuid"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].taskUuid").value(taskUuid.toString()))

        Mockito.verify(inventoryUsageService).getUsageByTaskUuid(taskUuid)
    }

    @Test
    fun `getUsageByContractorUuid should return list of usages`() {
        val response = listOf(createSampleResponse())

        Mockito.`when`(inventoryUsageService.getUsageByContractorUuid(contractorUuid)).thenReturn(response)

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/by-contractor/$contractorUuid"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].usedByContractorUuid").value(contractorUuid.toString()))

        Mockito.verify(inventoryUsageService).getUsageByContractorUuid(contractorUuid)
    }

    @Test
    fun `getApprovedUsage should return list of approved usages`() {
        val response = listOf(createSampleResponse().copy(trusteeApproved = true))

        Mockito.`when`(inventoryUsageService.getApprovedUsage()).thenReturn(response)

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/approved"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].trusteeApproved").value(true))

        Mockito.verify(inventoryUsageService).getApprovedUsage()
    }

    @Test
    fun `getPendingApprovalUsage should return list of pending usages`() {
        val response = listOf(createSampleResponse())

        Mockito.`when`(inventoryUsageService.getPendingApprovalUsage()).thenReturn(response)

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/pending-approval"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].trusteeApproved").value(false))

        Mockito.verify(inventoryUsageService).getPendingApprovalUsage()
    }

    @Test
    fun `getTotalQuantityUsedForItem should return total quantity`() {
        val totalQuantity = 50

        Mockito.`when`(inventoryUsageService.getTotalQuantityUsedForItem(itemUuid)).thenReturn(totalQuantity)

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/total-quantity/item/$itemUuid"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.totalQuantityUsed").value(50))

        Mockito.verify(inventoryUsageService).getTotalQuantityUsedForItem(itemUuid)
    }

    @Test
    fun `getTotalQuantityUsedByContractor should return total quantity`() {
        val totalQuantity = 75

        Mockito.`when`(inventoryUsageService.getTotalQuantityUsedByContractor(contractorUuid)).thenReturn(totalQuantity)

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/total-quantity/contractor/$contractorUuid"))
            .andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.totalQuantityUsed").value(75))

        Mockito.verify(inventoryUsageService).getTotalQuantityUsedByContractor(contractorUuid)
    }

    @Test
    fun `assignContractorToUsage should return updated response when successful`() {
        val request = AssignContractorRequest(contractorUuid = contractorUuid)
        val response = createSampleResponse()

        Mockito.`when`(inventoryUsageService.assignContractor(eq(usageUuid), eq(contractorUuid))).thenReturn(response)

        mockMvc
            .perform(
                MockMvcRequestBuilders
                    .patch("/api/inventory-usage/$usageUuid/assign-contractor")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.usedByContractorUuid").value(contractorUuid.toString()))

        Mockito.verify(inventoryUsageService).assignContractor(eq(usageUuid), eq(contractorUuid))
    }

    @Test
    fun `assignContractorToUsage should return not found when usage not exists`() {
        val request = AssignContractorRequest(contractorUuid = contractorUuid)

        Mockito
            .`when`(inventoryUsageService.assignContractor(eq(usageUuid), eq(contractorUuid)))
            .thenThrow(IllegalArgumentException("Usage not found"))

        mockMvc
            .perform(
                MockMvcRequestBuilders
                    .patch("/api/inventory-usage/$usageUuid/assign-contractor")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(MockMvcResultMatchers.status().isNotFound)

        Mockito.verify(inventoryUsageService).assignContractor(eq(usageUuid), eq(contractorUuid))
    }

    // Error handling tests for endpoints that return INTERNAL_SERVER_ERROR
    @Test
    fun `getUsageByItemUuid should return internal server error when service throws exception`() {
        Mockito
            .`when`(inventoryUsageService.getUsageByItemUuid(itemUuid))
            .thenThrow(RuntimeException("Service error"))

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/by-item/$itemUuid"))
            .andExpect(MockMvcResultMatchers.status().isInternalServerError)

        Mockito.verify(inventoryUsageService).getUsageByItemUuid(itemUuid)
    }

    @Test
    fun `getTotalQuantityUsedForItem should return internal server error when service throws exception`() {
        Mockito
            .`when`(inventoryUsageService.getTotalQuantityUsedForItem(itemUuid))
            .thenThrow(RuntimeException("Service error"))

        mockMvc
            .perform(MockMvcRequestBuilders.get("/api/inventory-usage/total-quantity/item/$itemUuid"))
            .andExpect(MockMvcResultMatchers.status().isInternalServerError)

        Mockito.verify(inventoryUsageService).getTotalQuantityUsedForItem(itemUuid)
    }
}
