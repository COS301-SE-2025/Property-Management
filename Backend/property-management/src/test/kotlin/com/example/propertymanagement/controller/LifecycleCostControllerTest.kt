package com.example.propertymanagement.controller

import com.example.propertymanagement.service.LifecycleCostService
import com.example.propertymanagement.dto.CreateLifecycleCostRequest
import com.example.propertymanagement.dto.LifecycleCostResponse
import com.example.propertymanagement.dto.UpdateLifecycleCostRequest
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.kotlin.eq
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import com.example.propertymanagement.exception.RestException
import org.springframework.http.HttpStatus
import java.math.BigDecimal
import java.util.UUID

@WebMvcTest(controllers = [LifecycleCostController::class])
class LifecycleCostControllerTest(
    @Autowired val mockMvc: MockMvc,
    @Autowired val objectMapper: ObjectMapper,
) {
    @MockBean
    lateinit var lifecycleCostService: LifecycleCostService

    private val coporateUuid = UUID.randomUUID()
    private val costUuid = UUID.randomUUID()

    private val createRequest = CreateLifecycleCostRequest(
        coporateUuid = coporateUuid,
        type = "Plumbing",
        description = "Fix leaks",
        condition = "Critical",
        timeframe = "Q3 2025",
        estimatedCost = BigDecimal("1500.00")
    )

    private val updateRequest = UpdateLifecycleCostRequest(
        type = "Electrical",
        description = "Wiring replacement",
        condition = "Moderate",
        timeframe = "Q4 2025",
        estimatedCost = BigDecimal("2500.00")
    )

    private val response = LifecycleCostResponse(
        costUuid = costUuid,
        coporateUuid = coporateUuid,
        type = "Plumbing",
        description = "Fix leaks",
        condition = "Critical",
        timeframe = "Q3 2025",
        estimatedCost = BigDecimal("1500.00")
    )

    @Test
    fun `create should return 200 OK with created lifecycle cost`() {
        Mockito.`when`(lifecycleCostService.create(eq(createRequest))).thenReturn(response)

        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/lifecycle-cost")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createRequest))
        ).andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.type").value("Plumbing"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.condition").value("Critical"))

        Mockito.verify(lifecycleCostService).create(eq(createRequest))
    }

    @Test
    fun `create should return 400 Bad Request when coporateUuid is invalid`() {
        val invalidRequest = createRequest.copy(coporateUuid = UUID.randomUUID())

        Mockito.`when`(lifecycleCostService.create(eq(invalidRequest)))
            .thenThrow(RestException(HttpStatus.BAD_REQUEST, "Invalid coporateUuid"))

        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/lifecycle-cost")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidRequest))
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
        .andExpect(MockMvcResultMatchers.jsonPath("$.error").value("Invalid coporateUuid"))
    }


    @Test
    fun `getById should return 200 OK with lifecycle cost`() {
        Mockito.`when`(lifecycleCostService.getById(eq(costUuid))).thenReturn(response)

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/lifecycle-cost/$costUuid")
        ).andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.costUuid").value(costUuid.toString()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.type").value("Plumbing"))

        Mockito.verify(lifecycleCostService).getById(eq(costUuid))
    }

    @Test
    fun `getById should return 404 Not Found when UUID does not exist`() {
        val missingUuid = UUID.randomUUID()

        Mockito.`when`(lifecycleCostService.getById(eq(missingUuid)))
            .thenThrow(RestException(HttpStatus.NOT_FOUND, "Lifecycle cost not found"))

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/lifecycle-cost/$missingUuid")
        ).andExpect(MockMvcResultMatchers.status().isNotFound)
        .andExpect(MockMvcResultMatchers.jsonPath("$.error").value("Lifecycle cost not found"))
    }

    @Test
    fun `getByCoporate should return 200 OK with list of lifecycle costs`() {
        Mockito.`when`(lifecycleCostService.getByCoporateUuid(eq(coporateUuid))).thenReturn(listOf(response))

        mockMvc.perform(
            MockMvcRequestBuilders.get("/api/lifecycle-cost/coporate/$coporateUuid")
        ).andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].coporateUuid").value(coporateUuid.toString()))

        Mockito.verify(lifecycleCostService).getByCoporateUuid(eq(coporateUuid))
    }

    @Test
    fun `update should return 200 OK with updated lifecycle cost`() {
        val updatedResponse = response.copy(
            type = "Electrical",
            description = "Wiring replacement",
            estimatedCost = BigDecimal("2500.00")
        )

        Mockito.`when`(lifecycleCostService.update(eq(costUuid), eq(updateRequest))).thenReturn(updatedResponse)

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/lifecycle-cost/$costUuid")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest))
        ).andExpect(MockMvcResultMatchers.status().isOk)
            .andExpect(MockMvcResultMatchers.jsonPath("$.type").value("Electrical"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.estimatedCost").value(2500.00))

        Mockito.verify(lifecycleCostService).update(eq(costUuid), eq(updateRequest))
    }

    @Test
    fun `update should return 404 Not Found when lifecycle cost does not exist`() {
        val missingUuid = UUID.randomUUID()

        Mockito.`when`(lifecycleCostService.update(eq(missingUuid), eq(updateRequest)))
            .thenThrow(RestException(HttpStatus.NOT_FOUND, "Lifecycle cost not found"))

        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/lifecycle-cost/$missingUuid")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest))
        ).andExpect(MockMvcResultMatchers.status().isNotFound)
        .andExpect(MockMvcResultMatchers.jsonPath("$.error").value("Lifecycle cost not found"))
    }

    @Test
    fun `create should return 400 Bad Request when JSON is malformed`() {
        val malformedJson = """{ "type": "Bad JSON", "estimatedCost": }""" 

        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/lifecycle-cost")
                .contentType(MediaType.APPLICATION_JSON)
                .content(malformedJson)
        ).andExpect(MockMvcResultMatchers.status().isBadRequest)
        .andExpect(MockMvcResultMatchers.jsonPath("$.error").value("Malformed JSON request"))
    }

    @Test
    fun `delete should return 204 No Content when successful`() {
        Mockito.`when`(lifecycleCostService.delete(eq(costUuid))).thenReturn(true)

        mockMvc.perform(
            MockMvcRequestBuilders.delete("/api/lifecycle-cost/$costUuid")
        ).andExpect(MockMvcResultMatchers.status().isNoContent)

        Mockito.verify(lifecycleCostService).delete(eq(costUuid))
    }

    @Test
    fun `delete should return 404 Not Found when uuid does not exist`() {
        Mockito.`when`(lifecycleCostService.delete(eq(costUuid))).thenReturn(false)

        mockMvc.perform(
            MockMvcRequestBuilders.delete("/api/lifecycle-cost/$costUuid")
        ).andExpect(MockMvcResultMatchers.status().isNotFound)

        Mockito.verify(lifecycleCostService).delete(eq(costUuid))
    }
}
