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
import org.mockito.ArgumentMatchers.any

import java.util.UUID

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
                Building(
                    buildingId = 1,
                    buildingUuid = UUID.randomUUID(),
                    name = "A",
                    address = "Addr",
                    type = "Type",
                    propertyValue = 100000.0,
                    primaryContractors = listOf(1, 2),
                    latestInspectionDate = null,
                    propertyImage = null
                ),
                Building(
                    buildingId = 2,
                    buildingUuid = UUID.randomUUID(),
                    name = "B",
                    address = "Addr2",
                    type = "Type2",
                    propertyValue = 200000.0,
                    primaryContractors = listOf(3, 4),
                    latestInspectionDate = null,
                    propertyImage = null
                ),
            )
            given(buildingService.getAll()).willReturn(buildings)

        mockMvc
            .perform(get("/api/buildings"))
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
                primaryContractors = listOf(1, 2),
                propertyValue = 150000.0,
                latestInspectionDate = null,
                propertyImage = null,
            )
        val building = Building(
            buildingId = 1,
            buildingUuid = UUID.randomUUID(),
            name = "Test",
            address = "Addr",
            type = "Type",
            propertyValue = 150000.0,
            primaryContractors = listOf(1, 2),
            latestInspectionDate = null,
            propertyImage = null
        )
        given(buildingService.create(request)).willReturn(building)

        mockMvc
            .perform(
                post("/api/buildings")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.name").value("Test"))
    }

    @Test
    fun `should return empty list when no buildings exist`() {
        given(buildingService.getAll()).willReturn(emptyList())

        mockMvc
            .perform(get("/api/buildings"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(0))
    }

    @Test
    fun `should return 405 for unsupported HTTP method`() {
        mockMvc
            .perform(put("/api/buildings"))
            .andExpect(status().isMethodNotAllowed)
    }

    @Test
    fun `should return 400 when POST has no JSON body`() {
        mockMvc
            .perform(
                post("/api/buildings")
                    .contentType(MediaType.APPLICATION_JSON),
            ).andExpect(status().isBadRequest)
    }
}
