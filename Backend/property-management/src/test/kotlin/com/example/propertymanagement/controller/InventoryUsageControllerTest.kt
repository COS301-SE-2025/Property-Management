package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.ApprovalRequest
import com.example.propertymanagement.dto.CreateInventoryUsageRequest
import com.example.propertymanagement.dto.InventoryUsageResponse
import com.example.propertymanagement.dto.UpdateInventoryUsageRequest
import com.example.propertymanagement.service.InventoryUsageService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.eq
import org.mockito.kotlin.whenever
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.data.domain.PageImpl
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.delete
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.patch
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.put
import java.sql.Date
import java.util.UUID

@WebMvcTest(InventoryUsageController::class)
class InventoryUsageControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @MockBean
    private lateinit var inventoryUsageService: InventoryUsageService

    private val usageUuid = UUID.randomUUID()
    private val itemUuid = UUID.randomUUID()
    private val taskUuid = UUID.randomUUID()
    private val contractorUuid = UUID.randomUUID()

    private fun sampleResponse() =
        InventoryUsageResponse(
            usageUuid = usageUuid,
            itemUuid = itemUuid,
            taskUuid = taskUuid,
            usedByContractorUuid = contractorUuid,
            quantityUsed = 5,
            trusteeApproved = true,
            approvalDate = Date(System.currentTimeMillis()),
        )

    @Test
    fun `createInventoryUsage returns 201 CREATED`() {
        val request = CreateInventoryUsageRequest(itemUuid, taskUuid, contractorUuid, 5)
        whenever(inventoryUsageService.createInventoryUsage(any())).thenReturn(sampleResponse())

        mockMvc
            .post("/api/inventory-usage") {
                contentType = MediaType.APPLICATION_JSON
                content = objectMapper.writeValueAsString(request)
            }.andExpect {
                status { isCreated() }
                jsonPath("$.usageUuid") { value(usageUuid.toString()) }
            }
    }

    @Test
    fun `getAllInventoryUsage returns 200 with paginated list`() {
        val page = PageImpl(listOf(sampleResponse()))
        whenever(inventoryUsageService.getAllInventoryUsage(any())).thenReturn(page)

        mockMvc
            .get("/api/inventory-usage?page=0&size=10&sortBy=usageUuid&sortDir=asc")
            .andExpect {
                status { isOk() }
                jsonPath("$.content.size()") { value(1) }
            }
    }

    @Test
    fun `getInventoryUsageById returns 200 when found`() {
        whenever(inventoryUsageService.getInventoryUsageById(usageUuid)).thenReturn(sampleResponse())

        mockMvc
            .get("/api/inventory-usage/$usageUuid")
            .andExpect {
                status { isOk() }
                jsonPath("$.usageUuid") { value(usageUuid.toString()) }
            }
    }

    @Test
    fun `updateInventoryUsage returns 200 with updated usage`() {
        val update = UpdateInventoryUsageRequest(quantityUsed = 10, trusteeApproved = true, approvalDate = Date(System.currentTimeMillis()))
        whenever(inventoryUsageService.updateInventoryUsage(eq(usageUuid), any())).thenReturn(sampleResponse())

        mockMvc
            .put("/api/inventory-usage/$usageUuid") {
                contentType = MediaType.APPLICATION_JSON
                content = objectMapper.writeValueAsString(update)
            }.andExpect {
                status { isOk() }
                jsonPath("$.usageUuid") { value(usageUuid.toString()) }
            }
    }

    @Test
    fun `deleteInventoryUsage returns 200 when successful`() {
        whenever(inventoryUsageService.deleteInventoryUsage(usageUuid)).thenReturn(true)

        mockMvc
            .delete("/api/inventory-usage/$usageUuid")
            .andExpect {
                status { isOk() }
                jsonPath("$.message") { value("Inventory usage deleted successfully") }
            }
    }

    @Test
    fun `approveInventoryUsage returns 200 with updated usage`() {
        val approval = ApprovalRequest(trusteeApproved = true)
        whenever(inventoryUsageService.approveInventoryUsage(eq(usageUuid), any())).thenReturn(sampleResponse())

        mockMvc
            .patch("/api/inventory-usage/$usageUuid/approval") {
                contentType = MediaType.APPLICATION_JSON
                content = objectMapper.writeValueAsString(approval)
            }.andExpect {
                status { isOk() }
                jsonPath("$.usageUuid") { value(usageUuid.toString()) }
            }
    }

    @Test
    fun `getUsageByItemUuid returns 200 with list`() {
        whenever(inventoryUsageService.getUsageByItemUuid(itemUuid)).thenReturn(listOf(sampleResponse()))

        mockMvc
            .get("/api/inventory-usage/by-item/$itemUuid")
            .andExpect {
                status { isOk() }
                jsonPath("$.size()") { value(1) }
            }
    }

    @Test
    fun `getUsageByTaskUuid returns 200 with list`() {
        whenever(inventoryUsageService.getUsageByTaskUuid(taskUuid)).thenReturn(listOf(sampleResponse()))

        mockMvc
            .get("/api/inventory-usage/by-task/$taskUuid")
            .andExpect {
                status { isOk() }
                jsonPath("$.size()") { value(1) }
            }
    }

    @Test
    fun `getUsageByContractorUuid returns 200 with list`() {
        whenever(inventoryUsageService.getUsageByContractorUuid(contractorUuid)).thenReturn(listOf(sampleResponse()))

        mockMvc
            .get("/api/inventory-usage/by-contractor/$contractorUuid")
            .andExpect {
                status { isOk() }
                jsonPath("$.size()") { value(1) }
            }
    }

    @Test
    fun `getApprovedUsage returns 200 with list`() {
        whenever(inventoryUsageService.getApprovedUsage()).thenReturn(listOf(sampleResponse()))

        mockMvc
            .get("/api/inventory-usage/approved")
            .andExpect {
                status { isOk() }
                jsonPath("$.size()") { value(1) }
            }
    }

    @Test
    fun `getPendingApprovalUsage returns 200 with list`() {
        whenever(inventoryUsageService.getPendingApprovalUsage()).thenReturn(listOf(sampleResponse()))

        mockMvc
            .get("/api/inventory-usage/pending-approval")
            .andExpect {
                status { isOk() }
                jsonPath("$.size()") { value(1) }
            }
    }

    @Test
    fun `getTotalQuantityUsedForItem returns 200 with total`() {
        whenever(inventoryUsageService.getTotalQuantityUsedForItem(itemUuid)).thenReturn(100)

        mockMvc
            .get("/api/inventory-usage/total-quantity/item/$itemUuid")
            .andExpect {
                status { isOk() }
                jsonPath("$.totalQuantityUsed") { value(100) }
            }
    }

    @Test
    fun `getTotalQuantityUsedByContractor returns 200 with total`() {
        whenever(inventoryUsageService.getTotalQuantityUsedByContractor(contractorUuid)).thenReturn(50)

        mockMvc
            .get("/api/inventory-usage/total-quantity/contractor/$contractorUuid")
            .andExpect {
                status { isOk() }
                jsonPath("$.totalQuantityUsed") { value(50) }
            }
    }
}
