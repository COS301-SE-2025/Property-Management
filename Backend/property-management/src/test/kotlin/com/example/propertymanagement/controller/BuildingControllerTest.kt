package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.BuildingByTrusteeDto
import com.example.propertymanagement.dto.BuildingCreateDto
import com.example.propertymanagement.dto.BuildingResponseDto
import com.example.propertymanagement.dto.BuildingUpdateDto
import com.example.propertymanagement.service.BuildingService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.mockito.kotlin.any
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.time.LocalDate
import java.util.UUID

@WebMvcTest(BuildingController::class)
class BuildingControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var buildingService: BuildingService

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    private val testUuid = UUID.randomUUID()
    private val trusteeUuid = UUID.randomUUID()

    @Test
    fun `createBuilding should return 201 CREATED when building is created successfully`() {
        val createDto =
            BuildingCreateDto(
                name = "Test Building",
                address = "123 Test St",
                type = "Residential",
                propertyValue = 1000000.0,
                primaryContractors = arrayOf(1, 2, 3),
                latestInspectionDate = LocalDate.of(2024, 1, 15),
                // complexName = "Test Complex",
                trusteeUuid = trusteeUuid,
                propertyImageId = "test-image-id",
            )

        val responseDto =
            BuildingResponseDto(
                buildingUuid = testUuid,
                name = "Test Building",
                address = "123 Test St",
                type = "Residential",
                propertyValue = 1000000.0,
                primaryContractors = arrayOf(1, 2, 3),
                latestInspectionDate = LocalDate.of(2024, 1, 15),
                propertyImage = "test-image.jpg",
                // complexName = "Test Complex",
                trusteeUuid = trusteeUuid,
            )

        `when`(buildingService.createBuilding(any())).thenReturn(responseDto)

        mockMvc.perform(
            post("/api/buildings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createDto)),
        )
            .andExpect(status().isCreated)
            .andExpect(jsonPath("$.buildingUuid").value(testUuid.toString()))
            .andExpect(jsonPath("$.name").value("Test Building"))
            .andExpect(jsonPath("$.address").value("123 Test St"))
            .andExpect(jsonPath("$.type").value("Residential"))
            .andExpect(jsonPath("$.propertyValue").value(1000000.0))
            // .andExpect(jsonPath("$.complexName").value("Test Complex"))
            .andExpect(jsonPath("$.trusteeUuid").value(trusteeUuid.toString()))

        verify(buildingService).createBuilding(any())
    }

    @Test
    fun `getAllBuildings should return 200 OK with list of buildings`() {
        val buildings =
            listOf(
                BuildingResponseDto(
                    buildingUuid = testUuid,
                    name = "Building 1",
                    address = "123 Test St",
                    type = "Residential",
                    propertyValue = 500000.0,
                    primaryContractors = arrayOf(1, 2),
                    latestInspectionDate = LocalDate.of(2024, 1, 10),
                    propertyImage = "building1.jpg",
                    // complexName = "Test Complex 1",
                    trusteeUuid = trusteeUuid,
                ),
                BuildingResponseDto(
                    buildingUuid = UUID.randomUUID(),
                    name = "Building 2",
                    address = "456 Test Ave",
                    type = "Commercial",
                    propertyValue = 1200000.0,
                    primaryContractors = arrayOf(3, 4),
                    latestInspectionDate = LocalDate.of(2024, 2, 15),
                    propertyImage = "building2.jpg",
                    // complexName = "Test Complex 2",
                    trusteeUuid = trusteeUuid,
                ),
            )

        `when`(buildingService.getAllBuildings()).thenReturn(buildings)

        mockMvc.perform(get("/api/buildings"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].name").value("Building 1"))
            .andExpect(jsonPath("$[1].name").value("Building 2"))

        verify(buildingService).getAllBuildings()
    }

    @Test
    fun `getAllBuildings should return 200 OK with empty list when no buildings exist`() {
        `when`(buildingService.getAllBuildings()).thenReturn(emptyList())

        mockMvc.perform(get("/api/buildings"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(0))

        verify(buildingService).getAllBuildings()
    }

    @Test
    fun `getBuildingByUuid should return 200 OK when building exists`() {
        val responseDto =
            BuildingResponseDto(
                buildingUuid = testUuid,
                name = "Test Building",
                address = "123 Test St",
                type = "Residential",
                propertyValue = 800000.0,
                primaryContractors = arrayOf(1, 3),
                latestInspectionDate = LocalDate.of(2024, 1, 20),
                propertyImage = "test-building.jpg",
                // complexName = "Main Complex",
                trusteeUuid = trusteeUuid,
            )

        `when`(buildingService.getBuildingByUuid(testUuid)).thenReturn(responseDto)

        mockMvc.perform(get("/api/buildings/{uuid}", testUuid))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.buildingUuid").value(testUuid.toString()))
            .andExpect(jsonPath("$.name").value("Test Building"))

        verify(buildingService).getBuildingByUuid(testUuid)
    }

    @Test
    fun `getBuildingByUuid should return 404 NOT FOUND when building does not exist`() {
        `when`(buildingService.getBuildingByUuid(testUuid)).thenReturn(null)

        mockMvc.perform(get("/api/buildings/{uuid}", testUuid))
            .andExpect(status().isNotFound)

        verify(buildingService).getBuildingByUuid(testUuid)
    }

    @Test
    fun `updateBuilding should return 200 OK when building is updated successfully`() {
        val updateDto =
            BuildingUpdateDto(
                name = "Updated Building", // Only update the name
            )

        val responseDto =
            BuildingResponseDto(
                buildingUuid = testUuid,
                name = "Updated Building",
                address = "123 Test St",
                type = "Residential",
                propertyValue = 1000000.0,
                primaryContractors = arrayOf(1, 2, 3),
                latestInspectionDate = LocalDate.of(2024, 1, 15),
                propertyImage = "test-image.jpg",
                // complexName = "Test Complex",
                trusteeUuid = trusteeUuid,
            )

        `when`(buildingService.updateBuilding(testUuid, updateDto)).thenReturn(responseDto)

        mockMvc.perform(
            put("/api/buildings/{uuid}", testUuid)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDto)),
        ).andExpect(status().isOk)
            .andExpect(jsonPath("$.name").value("Updated Building"))

        verify(buildingService).updateBuilding(testUuid, updateDto)
    }

    @Test
    fun `updateBuilding should return 404 NOT FOUND when building does not exist`() {
        val updateDto =
            BuildingUpdateDto(
                name = "Updated Building",
                address = null,
                type = null,
                propertyValue = null,
                primaryContractors = null,
                latestInspectionDate = null,
                propertyImageId = null,
                // complexName = null,
                trusteeUuid = null,
            )
        `when`(buildingService.updateBuilding(testUuid, updateDto)).thenReturn(null)

        mockMvc.perform(
            put("/api/buildings/{uuid}", testUuid)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateDto)),
        )
            .andExpect(status().isNotFound)

        verify(buildingService).updateBuilding(testUuid, updateDto)
    }

    @Test
    fun `deleteBuilding should return 204 NO CONTENT when building is deleted successfully`() {
        `when`(buildingService.deleteBuilding(testUuid)).thenReturn(true)

        mockMvc.perform(delete("/api/buildings/{uuid}", testUuid))
            .andExpect(status().isNoContent)

        verify(buildingService).deleteBuilding(testUuid)
    }

    @Test
    fun `deleteBuilding should return 404 NOT FOUND when building does not exist`() {
        `when`(buildingService.deleteBuilding(testUuid)).thenReturn(false)

        mockMvc.perform(delete("/api/buildings/{uuid}", testUuid))
            .andExpect(status().isNotFound)

        verify(buildingService).deleteBuilding(testUuid)
    }

    @Test
    fun `getBuildingsByTrustee should return 200 OK with trustee buildings`() {
        val buildings =
            listOf(
                BuildingResponseDto(
                    buildingUuid = testUuid,
                    name = "Trustee Building 1",
                    address = "789 Trustee St",
                    type = "Residential",
                    propertyValue = 900000.0,
                    primaryContractors = arrayOf(7, 8),
                    latestInspectionDate = LocalDate.of(2024, 2, 1),
                    propertyImage = "trustee1.jpg",
                    // complexName = "Trustee Complex 1",
                    trusteeUuid = trusteeUuid,
                ),
                BuildingResponseDto(
                    buildingUuid = UUID.randomUUID(),
                    name = "Trustee Building 2",
                    address = "321 Trustee Ave",
                    type = "Commercial",
                    propertyValue = 1100000.0,
                    primaryContractors = arrayOf(9, 10),
                    latestInspectionDate = LocalDate.of(2024, 2, 10),
                    propertyImage = "trustee2.jpg",
                    // complexName = "Trustee Complex 2",
                    trusteeUuid = trusteeUuid,
                ),
            )
        val trusteeDto =
            BuildingByTrusteeDto(
                trusteeUuid = trusteeUuid,
                buildings = buildings,
            )

        `when`(buildingService.getBuildingsByTrustee(trusteeUuid)).thenReturn(trusteeDto)

        mockMvc.perform(get("/api/buildings/trustee/{trusteeUuid}", trusteeUuid))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.trusteeUuid").value(trusteeUuid.toString()))
            .andExpect(jsonPath("$.buildings.length()").value(2))

        verify(buildingService).getBuildingsByTrustee(trusteeUuid)
    }

    @Test
    fun `searchBuildingsByName should return 200 OK with matching buildings`() {
        val searchName = "Test"
        val buildings =
            listOf(
                BuildingResponseDto(
                    buildingUuid = testUuid,
                    name = "Test Building 1",
                    address = "111 Search St",
                    type = "Residential",
                    propertyValue = 750000.0,
                    primaryContractors = arrayOf(11, 12),
                    latestInspectionDate = LocalDate.of(2024, 1, 25),
                    propertyImage = "search1.jpg",
                    // complexName = "Search Complex 1",
                    trusteeUuid = trusteeUuid,
                ),
                BuildingResponseDto(
                    buildingUuid = UUID.randomUUID(),
                    name = "Test Building 2",
                    address = "222 Search Ave",
                    type = "Commercial",
                    propertyValue = 950000.0,
                    primaryContractors = arrayOf(13, 14),
                    latestInspectionDate = LocalDate.of(2024, 1, 30),
                    propertyImage = "search2.jpg",
                    // complexName = "Search Complex 2",
                    trusteeUuid = trusteeUuid,
                ),
            )

        `when`(buildingService.searchBuildingsByName(searchName)).thenReturn(buildings)

        mockMvc.perform(
            get("/api/buildings/search")
                .param("name", searchName),
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].name").value("Test Building 1"))
            .andExpect(jsonPath("$[1].name").value("Test Building 2"))

        verify(buildingService).searchBuildingsByName(searchName)
    }

    @Test
    fun `searchBuildingsByName should return 200 OK with empty list when no matches found`() {
        val searchName = "NonExistent"
        `when`(buildingService.searchBuildingsByName(searchName)).thenReturn(emptyList())

        mockMvc.perform(
            get("/api/buildings/search")
                .param("name", searchName),
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(0))

        verify(buildingService).searchBuildingsByName(searchName)
    }

    @Test
    fun `getBuildingsByType should return 200 OK with buildings of specified type`() {
        val buildingType = "Residential"
        val buildings =
            listOf(
                BuildingResponseDto(
                    buildingUuid = testUuid,
                    name = "Residential Building 1",
                    address = "333 Residential St",
                    type = buildingType,
                    propertyValue = 650000.0,
                    primaryContractors = arrayOf(15, 16),
                    latestInspectionDate = LocalDate.of(2024, 2, 5),
                    propertyImage = "residential1.jpg",
                    // complexName = "Residential Complex 1",
                    trusteeUuid = trusteeUuid,
                ),
                BuildingResponseDto(
                    buildingUuid = UUID.randomUUID(),
                    name = "Residential Building 2",
                    address = "444 Residential Ave",
                    type = buildingType,
                    propertyValue = 850000.0,
                    primaryContractors = arrayOf(17, 18),
                    latestInspectionDate = LocalDate.of(2024, 2, 12),
                    propertyImage = "residential2.jpg",
                    // complexName = "Residential Complex 2",
                    trusteeUuid = trusteeUuid,
                ),
            )

        `when`(buildingService.getBuildingsByType(buildingType)).thenReturn(buildings)

        mockMvc.perform(get("/api/buildings/type/{type}", buildingType))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(2))
            .andExpect(jsonPath("$[0].type").value(buildingType))
            .andExpect(jsonPath("$[1].type").value(buildingType))

        verify(buildingService).getBuildingsByType(buildingType)
    }

    @Test
    fun `getBuildingsByType should return 200 OK with empty list when no buildings of type exist`() {
        val buildingType = "Industrial"
        `when`(buildingService.getBuildingsByType(buildingType)).thenReturn(emptyList())

        mockMvc.perform(get("/api/buildings/type/{type}", buildingType))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(0))

        verify(buildingService).getBuildingsByType(buildingType)
    }

    @Test
    fun `updateBuilding should return 400 BAD REQUEST when request body is invalid`() {
        mockMvc.perform(
            put("/api/buildings/{uuid}", testUuid)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{ invalid json }"),
        ).andExpect(status().isBadRequest)
    }
}
