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
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
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

    @Test
    fun `getAllBodyCorporates should return 200 OK with paginated results`() {
        val responseList =
            listOf(
                BodyCorporateResponse(
                    corporateUuid = testUuid,
                    corporateName = "Test Corp",
                    contributionPerSqm = BigDecimal("10.00"),
                    totalBudget = BigDecimal("10000.00"),
                    email = "corp@test.com",
                    userId = "user1",
                    username = "testuser",
                ),
            )
        val pageResponse =
            org.springframework.data.domain
                .PageImpl(responseList)

        `when`(bodyCorporateService.getAllBodyCorporates(any())).thenReturn(pageResponse)

        mockMvc
            .perform(
                get("/api/body-corporates")
                    .param("page", "0")
                    .param("size", "20")
                    .param("sortBy", "corporateName")
                    .param("sortDirection", "asc"),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.content.length()").value(1))
            .andExpect(jsonPath("$.content[0].corporateName").value("Test Corp"))

        verify(bodyCorporateService).getAllBodyCorporates(any())
    }

    @Test
    fun `getBodyCorporateStatistics should return 200 OK with statistics`() {
        val statistics =
            BodyCorporateService.BodyCorporateStatistics(
                totalBodyCorporates = 5L,
                totalCombinedBudget = BigDecimal("50000.00"),
            )

        `when`(bodyCorporateService.getBodyCorporateStatistics()).thenReturn(statistics)

        mockMvc
            .perform(get("/api/body-corporates/statistics"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.totalBodyCorporates").value(5))
            .andExpect(jsonPath("$.totalCombinedBudget").value(50000.00))

        verify(bodyCorporateService).getBodyCorporateStatistics()
    }

    @Test
    fun `getBodyCorporateByEmail should return 200 OK when found`() {
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

        `when`(bodyCorporateService.getBodyCorporateByEmail("test@corp.com")).thenReturn(response)

        mockMvc
            .perform(get("/api/body-corporates/email/{email}", "test@corp.com"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.corporateName").value("Test Corp"))

        verify(bodyCorporateService).getBodyCorporateByEmail("test@corp.com")
    }

    @Test
    fun `getBodyCorporateByEmail should return 404 NOT FOUND when not found`() {
        `when`(bodyCorporateService.getBodyCorporateByEmail("missing@corp.com")).thenThrow(NoSuchElementException("not found"))

        mockMvc
            .perform(get("/api/body-corporates/email/{email}", "missing@corp.com"))
            .andExpect(status().isNotFound)
    }

    @Test
    fun `getBodyCorporateByUserId should return 200 OK when found`() {
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

        `when`(bodyCorporateService.getBodyCorporateByUserId("user123")).thenReturn(response)

        mockMvc
            .perform(get("/api/body-corporates/user/{userId}", "user123"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.corporateName").value("Test Corp"))

        verify(bodyCorporateService).getBodyCorporateByUserId("user123")
    }

    @Test
    fun `getBodyCorporateByUserId should return 404 NOT FOUND when not found`() {
        `when`(bodyCorporateService.getBodyCorporateByUserId("missingUser")).thenThrow(NoSuchElementException("not found"))

        mockMvc
            .perform(get("/api/body-corporates/user/{userId}", "missingUser"))
            .andExpect(status().isNotFound)
    }

    @Test
    fun `getBodyCorporatesByMinimumBudget should return 200 OK with results`() {
        val responseList =
            listOf(
                BodyCorporateResponse(
                    corporateUuid = testUuid,
                    corporateName = "Corp1",
                    contributionPerSqm = BigDecimal("10.00"),
                    totalBudget = BigDecimal("20000.00"),
                    email = "corp1@corp.com",
                    userId = "user1",
                    username = "corp1user",
                ),
            )

        `when`(bodyCorporateService.getBodyCorporatesByMinimumBudget(BigDecimal("15000.00"))).thenReturn(responseList)

        mockMvc
            .perform(
                get("/api/body-corporates/filter/budget")
                    .param("minBudget", "15000.00"),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].corporateName").value("Corp1"))

        verify(bodyCorporateService).getBodyCorporatesByMinimumBudget(BigDecimal("15000.00"))
    }
}
