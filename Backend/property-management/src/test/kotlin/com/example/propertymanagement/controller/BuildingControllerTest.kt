package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.BuildingCreateRequest
import com.example.propertymanagement.model.Building
import com.example.propertymanagement.service.BuildingService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status



@WebMvcTest(BuildingController::class)
class BuildingControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var buildingService: BuildingService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `should return all buildings`() {
        val buildings =
            listOf(
                Building(1, "A", "Addr", "Type", null, null, null, null, null),
                Building(2, "B", "Addr2", "Type2", null, null, null, null, null),
            )
        given(buildingService.getAll()).willReturn(buildings)

        mockMvc.perform(get("/api/buildings"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(2))
    }

    @Test
    fun `should create a building`() {
        val request =
            BuildingCreateRequest(
                name = "Test",
                address = "Addr",
                type = "Type",
                trustees = null,
                propertyValue = null,
                primaryContractors = null,
                latestInspectionDate = null,
                propertyImage = null,
            )
        val building = Building(1, "Test", "Addr", "Type", null, null, null, null, null)
        given(buildingService.create(any())).willReturn(building)

        mockMvc.perform(
            post("/api/buildings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)),
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.name").value("Test"))
    }

    @Test
    fun `should return empty list when no buildings exist`() {
        given(buildingService.getAll()).willReturn(emptyList())

        mockMvc.perform(get("/api/buildings"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(0))
    }

    @Test
    fun `should return 405 for unsupported HTTP method`() {
        mockMvc.perform(put("/api/buildings"))
            .andExpect(status().isMethodNotAllowed)
    }

    @Test
    fun `should return 400 when POST has no JSON body`() {
        mockMvc.perform(
            post("/api/buildings")
                .contentType(MediaType.APPLICATION_JSON),
        )
            .andExpect(status().isBadRequest)
    }
}
