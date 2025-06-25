package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.BodyCorporateRegistrationResponse
import com.example.propertymanagement.dto.BodyCorporateResponse
import com.example.propertymanagement.dto.CreateBodyCorporateRequest
import com.example.propertymanagement.dto.UpdateBodyCorporateRequest
import com.example.propertymanagement.service.BodyCorporateService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.mockito.kotlin.any
import org.mockito.kotlin.eq
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import java.math.BigDecimal
import java.util.UUID

@WebMvcTest(controllers = [BodyCorporateController::class])
class BodyCoporateControllerTest(
    @Autowired val mockMvc: MockMvc,
) {
    @MockBean
    lateinit var bodyCorporateService: BodyCorporateService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    private val testUuid = UUID.randomUUID()

    @Test
    fun `registerBodyCorporate should return 201 CREATED on success`() {
        val request =
            CreateBodyCorporateRequest(
                corporateName = "Test Corp",
                contributionPerSqm = BigDecimal("10.00"),
                totalBudget = BigDecimal("10000.00"),
                email = "test@corp.com",
                password = "password123",
                contactNumber = "0123456789",
            )
        val response =
            BodyCorporateRegistrationResponse(
                corporateUuid = testUuid,
                corporateName = "Test Corp",
                email = "test@corp.com",
                cognitoUserId = "cognito123",
                username = "testuser",
            )
        `when`(bodyCorporateService.registerBodyCorporate(any())).thenReturn(response)

        mockMvc
            .perform(
                post("/api/body-corporates/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isCreated)
            .andExpect(jsonPath("$.corporateUuid").value(testUuid.toString()))
            .andExpect(jsonPath("$.corporateName").value("Test Corp"))
            .andExpect(jsonPath("$.email").value("test@corp.com"))

        verify(bodyCorporateService).registerBodyCorporate(any())
    }

    @Test
    fun `getBodyCorporateById should return 200 OK when found`() {
        val response =
            BodyCorporateResponse(
                corporateUuid = testUuid,
                corporateName = "Test Corp",
                contributionPerSqm = BigDecimal("10.00"),
                totalBudget = BigDecimal("10000.00"),
                email = "test@corp.com",
                userId = "user123",
                username = "testuser",
            )
        `when`(bodyCorporateService.getBodyCorporateById(testUuid)).thenReturn(response)

        mockMvc
            .perform(get("/api/body-corporates/{id}", testUuid))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.corporateUuid").value(testUuid.toString()))
            .andExpect(jsonPath("$.corporateName").value("Test Corp"))

        verify(bodyCorporateService).getBodyCorporateById(testUuid)
    }

    @Test
    fun `getBodyCorporateById should return 404 NOT FOUND when not found`() {
        `when`(bodyCorporateService.getBodyCorporateById(testUuid)).thenThrow(NoSuchElementException("not found"))

        mockMvc
            .perform(get("/api/body-corporates/{id}", testUuid))
            .andExpect(status().isNotFound)
    }

    @Test
    fun `updateBodyCorporate should return 200 OK on success`() {
        val updateRequest =
            UpdateBodyCorporateRequest(
                corporateName = "Updated Corp",
                contributionPerSqm = BigDecimal("12.00"),
                totalBudget = BigDecimal("12000.00"),
                email = "updated@corp.com",
            )
        val response =
            BodyCorporateResponse(
                corporateUuid = testUuid,
                corporateName = "Updated Corp",
                contributionPerSqm = BigDecimal("12.00"),
                totalBudget = BigDecimal("12000.00"),
                email = "updated@corp.com",
                userId = "user123",
                username = "testuser",
            )
        `when`(bodyCorporateService.updateBodyCorporate(eq(testUuid), any())).thenReturn(response)

        mockMvc
            .perform(
                put("/api/body-corporates/{id}", testUuid)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(updateRequest)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.corporateName").value("Updated Corp"))

        verify(bodyCorporateService).updateBodyCorporate(eq(testUuid), any())
    }

    @Test
    fun `deleteBodyCorporate should return 200 OK on success`() {
        mockMvc
            .perform(delete("/api/body-corporates/{id}", testUuid))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.message").value("Body corporate deleted successfully"))

        verify(bodyCorporateService).deleteBodyCorporate(testUuid)
    }

    @Test
    fun `deleteBodyCorporate should return 404 NOT FOUND when not found`() {
        `when`(bodyCorporateService.deleteBodyCorporate(testUuid)).thenThrow(NoSuchElementException("not found"))

        mockMvc
            .perform(delete("/api/body-corporates/{id}", testUuid))
            .andExpect(status().isNotFound)
    }

    @Test
    fun `searchBodyCorporatesByName should return 200 OK with results`() {
        val responseList =
            listOf(
                BodyCorporateResponse(
                    corporateUuid = testUuid,
                    corporateName = "Corp1",
                    contributionPerSqm = BigDecimal("10.00"),
                    totalBudget = BigDecimal("10000.00"),
                    email = "corp1@corp.com",
                    userId = "user1",
                    username = "corp1user",
                ),
            )
        `when`(bodyCorporateService.searchBodyCorporatesByName("Corp")).thenReturn(responseList)

        mockMvc
            .perform(get("/api/body-corporates/search").param("name", "Corp"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].corporateName").value("Corp1"))

        verify(bodyCorporateService).searchBodyCorporatesByName("Corp")
    }
}
