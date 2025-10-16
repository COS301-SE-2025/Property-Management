package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.BodyCorporateRegistrationResponse
import com.example.propertymanagement.dto.BodyCorporateResponse
import com.example.propertymanagement.dto.CreateBodyCorporateRequest
import com.example.propertymanagement.dto.LoginRequest
import com.example.propertymanagement.dto.LoginResponse
import com.example.propertymanagement.dto.UpdateBodyCorporateRequest
import com.example.propertymanagement.service.BodyCorporateService
import com.example.propertymanagement.service.CognitoService
import org.junit.jupiter.api.Test
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.mockito.kotlin.any
import org.mockito.kotlin.eq
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.math.BigDecimal
import java.util.NoSuchElementException
import java.util.UUID

@WebMvcTest(controllers = [BodyCorporateController::class])
@AutoConfigureMockMvc(addFilters = false)
class BodyCorporateControllerTest(
    @Autowired val mockMvc: MockMvc,
) {
    @MockBean
    lateinit var bodyCorporateService: BodyCorporateService

    @MockBean
    lateinit var cognitoService: CognitoService

    @Autowired
    lateinit var objectMapper: com.fasterxml.jackson.databind.ObjectMapper

    private val testUuid = UUID.randomUUID()
    private val testEmail = "test@example.com"
    private val testUserId = "user123"
    private val testName = "Test Corp"

    @Test
    fun `registerBodyCorporate should return 201 CREATED when registration is successful`() {
        val request =
            CreateBodyCorporateRequest(
                corporateName = testName,
                contributionPerSqm = BigDecimal("100.00"),
                totalBudget = BigDecimal("100000.00"),
                email = testEmail,
                password = "password123",
                contactNumber = "1234567890",
            )

        val response =
            BodyCorporateRegistrationResponse(
                corporateUuid = testUuid,
                corporateName = testName,
                email = testEmail,
                cognitoUserId = testUserId,
                username = "testuser",
                emailVerificationRequired = true,
            )

        `when`(bodyCorporateService.registerBodyCorporate(any())).thenReturn(response)

        mockMvc
            .perform(
                post("/api/body-corporates/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isCreated)
            .andExpect(jsonPath("$.corporateUuid").value(testUuid.toString()))
            .andExpect(jsonPath("$.corporateName").value(testName))
            .andExpect(jsonPath("$.email").value(testEmail))

        verify(bodyCorporateService).registerBodyCorporate(any())
    }

    @Test
    fun `registerBodyCorporate should return 400 BAD REQUEST when request body is invalid`() {
        mockMvc
            .perform(
                post("/api/body-corporates/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{ invalid json }"),
            ).andExpect(status().isBadRequest)
    }

    @Test
    fun `login should return 200 OK when login is successful`() {
        val request =
            LoginRequest(
                email = testEmail,
                password = "password123",
            )

        val response =
            LoginResponse(
                idToken = "id123",
                accessToken = "token123",
                refreshToken = "refresh123",
                userId = "id123",
                userType = "BODY_CORPORATE",
            )

        `when`(bodyCorporateService.login(any())).thenReturn(response)

        mockMvc
            .perform(
                post("/api/body-corporates/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.accessToken").value("token123"))

        verify(bodyCorporateService).login(any())
    }

    @Test
    fun `getAllBodyCorporates should return 200 OK with paginated list`() {
        val bodyCorporates =
            listOf(
                BodyCorporateResponse(
                    corporateUuid = testUuid,
                    corporateName = testName,
                    contributionPerSqm = BigDecimal("100.00"),
                    totalBudget = BigDecimal("100000.00"),
                    email = testEmail,
                    userId = testUserId,
                    username = "testuser",
                ),
            )
        val pageable = PageRequest.of(0, 20, Sort.by("corporateName").ascending())
        val page = PageImpl(bodyCorporates, pageable, bodyCorporates.size.toLong())

        `when`(bodyCorporateService.getAllBodyCorporates(any())).thenReturn(page)

        mockMvc
            .perform(get("/api/body-corporates?page=0&size=20&sortBy=corporateName&sortDirection=asc"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.content.length()").value(1))
            .andExpect(jsonPath("$.content[0].corporateName").value(testName))

        verify(bodyCorporateService).getAllBodyCorporates(any())
    }

    @Test
    fun `getBodyCorporateById should return 200 OK when body corporate exists`() {
        val response =
            BodyCorporateResponse(
                corporateUuid = testUuid,
                corporateName = testName,
                contributionPerSqm = BigDecimal("100.00"),
                totalBudget = BigDecimal("100000.00"),
                email = testEmail,
                userId = testUserId,
                username = "testuser",
            )

        `when`(bodyCorporateService.getBodyCorporateById(testUuid)).thenReturn(response)

        mockMvc
            .perform(get("/api/body-corporates/{id}", testUuid))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.corporateUuid").value(testUuid.toString()))
            .andExpect(jsonPath("$.corporateName").value(testName))

        verify(bodyCorporateService).getBodyCorporateById(testUuid)
    }

    @Test
    fun `getBodyCorporateById should return 404 NOT FOUND when body corporate does not exist`() {
        `when`(bodyCorporateService.getBodyCorporateById(testUuid)).thenThrow(NoSuchElementException())

        mockMvc
            .perform(get("/api/body-corporates/{id}", testUuid))
            .andExpect(status().isNotFound)

        verify(bodyCorporateService).getBodyCorporateById(testUuid)
    }

    @Test
    fun `getBodyCorporateByEmail should return 200 OK when body corporate exists`() {
        val response =
            BodyCorporateResponse(
                corporateUuid = testUuid,
                corporateName = testName,
                contributionPerSqm = BigDecimal("100.00"),
                totalBudget = BigDecimal("100000.00"),
                email = testEmail,
                userId = testUserId,
                username = "testuser",
            )

        `when`(bodyCorporateService.getBodyCorporateByEmail(testEmail)).thenReturn(response)

        mockMvc
            .perform(get("/api/body-corporates/email/{email}", testEmail))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.email").value(testEmail))

        verify(bodyCorporateService).getBodyCorporateByEmail(testEmail)
    }

    @Test
    fun `getBodyCorporateByEmail should return 404 NOT FOUND when body corporate does not exist`() {
        `when`(bodyCorporateService.getBodyCorporateByEmail(testEmail)).thenThrow(NoSuchElementException())

        mockMvc
            .perform(get("/api/body-corporates/email/{email}", testEmail))
            .andExpect(status().isNotFound)

        verify(bodyCorporateService).getBodyCorporateByEmail(testEmail)
    }

    @Test
    fun `getBodyCorporateByUserId should return 200 OK when body corporate exists`() {
        val response =
            BodyCorporateResponse(
                corporateUuid = testUuid,
                corporateName = testName,
                contributionPerSqm = BigDecimal("100.00"),
                totalBudget = BigDecimal("100000.00"),
                email = testEmail,
                userId = testUserId,
                username = "testuser",
            )

        `when`(bodyCorporateService.getBodyCorporateByUserId(testUserId)).thenReturn(response)

        mockMvc
            .perform(get("/api/body-corporates/user/{userId}", testUserId))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.userId").value(testUserId))

        verify(bodyCorporateService).getBodyCorporateByUserId(testUserId)
    }

    @Test
    fun `getBodyCorporateByUserId should return 404 NOT FOUND when body corporate does not exist`() {
        `when`(bodyCorporateService.getBodyCorporateByUserId(testUserId)).thenThrow(NoSuchElementException())

        mockMvc
            .perform(get("/api/body-corporates/user/{userId}", testUserId))
            .andExpect(status().isNotFound)

        verify(bodyCorporateService).getBodyCorporateByUserId(testUserId)
    }

    @Test
    fun `updateBodyCorporate should return 200 OK when update is successful`() {
        val request =
            UpdateBodyCorporateRequest(
                corporateName = "Updated Corp",
                contributionPerSqm = BigDecimal("150.00"),
            )

        val response =
            BodyCorporateResponse(
                corporateUuid = testUuid,
                corporateName = "Updated Corp",
                contributionPerSqm = BigDecimal("150.00"),
                totalBudget = BigDecimal("100000.00"),
                email = testEmail,
                userId = testUserId,
                username = "testuser",
            )

        `when`(bodyCorporateService.updateBodyCorporate(eq(testUuid), any())).thenReturn(response)

        mockMvc
            .perform(
                put("/api/body-corporates/{id}", testUuid)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.corporateName").value("Updated Corp"))

        verify(bodyCorporateService).updateBodyCorporate(eq(testUuid), any())
    }

    @Test
    fun `updateBodyCorporate should return 404 NOT FOUND when body corporate does not exist`() {
        val request = UpdateBodyCorporateRequest(corporateName = "Updated Corp")
        `when`(bodyCorporateService.updateBodyCorporate(eq(testUuid), any())).thenThrow(NoSuchElementException())

        mockMvc
            .perform(
                put("/api/body-corporates/{id}", testUuid)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isNotFound)

        verify(bodyCorporateService).updateBodyCorporate(eq(testUuid), any())
    }

    @Test
    fun `updateBodyCorporate should return 400 BAD REQUEST when request body is invalid`() {
        mockMvc
            .perform(
                put("/api/body-corporates/{id}", testUuid)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{ invalid json }"),
            ).andExpect(status().isBadRequest)
    }

    @Test
    fun `deleteBodyCorporate should return 200 OK when deletion is successful`() {
        mockMvc
            .perform(delete("/api/body-corporates/{id}", testUuid))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.message").value("Body corporate deleted successfully"))

        verify(bodyCorporateService).deleteBodyCorporate(testUuid)
    }

    @Test
    fun `deleteBodyCorporate should return 404 NOT FOUND when body corporate does not exist`() {
        `when`(bodyCorporateService.deleteBodyCorporate(testUuid)).thenThrow(NoSuchElementException("Not found"))

        mockMvc
            .perform(delete("/api/body-corporates/{id}", testUuid))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Not found"))

        verify(bodyCorporateService).deleteBodyCorporate(testUuid)
    }

    @Test
    fun `searchBodyCorporatesByName should return 200 OK with matching body corporates`() {
        val bodyCorporates =
            listOf(
                BodyCorporateResponse(
                    corporateUuid = testUuid,
                    corporateName = testName,
                    contributionPerSqm = BigDecimal("100.00"),
                    totalBudget = BigDecimal("100000.00"),
                    email = testEmail,
                    userId = testUserId,
                    username = "testuser",
                ),
            )

        `when`(bodyCorporateService.searchBodyCorporatesByName("Test")).thenReturn(bodyCorporates)

        mockMvc
            .perform(get("/api/body-corporates/search?name=Test"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].corporateName").value(testName))

        verify(bodyCorporateService).searchBodyCorporatesByName("Test")
    }

    @Test
    fun `searchBodyCorporatesByName should return 200 OK with empty list when no matches found`() {
        `when`(bodyCorporateService.searchBodyCorporatesByName("NonExistent")).thenReturn(emptyList())

        mockMvc
            .perform(get("/api/body-corporates/search?name=NonExistent"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(0))

        verify(bodyCorporateService).searchBodyCorporatesByName("NonExistent")
    }

    @Test
    fun `getBodyCorporatesByContributionRange should return 200 OK with matching body corporates`() {
        val bodyCorporates =
            listOf(
                BodyCorporateResponse(
                    corporateUuid = testUuid,
                    corporateName = testName,
                    contributionPerSqm = BigDecimal("100.00"),
                    totalBudget = BigDecimal("100000.00"),
                    email = testEmail,
                    userId = testUserId,
                    username = "testuser",
                ),
            )

        `when`(bodyCorporateService.getBodyCorporatesByContributionRange(BigDecimal("50.00"), BigDecimal("150.00")))
            .thenReturn(bodyCorporates)

        mockMvc
            .perform(get("/api/body-corporates/filter/contribution?minContribution=50.00&maxContribution=150.00"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].contributionPerSqm").value(100.00))

        verify(bodyCorporateService).getBodyCorporatesByContributionRange(BigDecimal("50.00"), BigDecimal("150.00"))
    }

    @Test
    fun `getBodyCorporatesByMinimumBudget should return 200 OK with matching body corporates`() {
        val bodyCorporates =
            listOf(
                BodyCorporateResponse(
                    corporateUuid = testUuid,
                    corporateName = testName,
                    contributionPerSqm = BigDecimal("100.00"),
                    totalBudget = BigDecimal("100000.00"),
                    email = testEmail,
                    userId = testUserId,
                    username = "testuser",
                ),
            )

        `when`(bodyCorporateService.getBodyCorporatesByMinimumBudget(BigDecimal("50000.00")))
            .thenReturn(bodyCorporates)

        mockMvc
            .perform(get("/api/body-corporates/filter/budget?minBudget=50000.00"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.length()").value(1))
            .andExpect(jsonPath("$[0].totalBudget").value(100000.00))

        verify(bodyCorporateService).getBodyCorporatesByMinimumBudget(BigDecimal("50000.00"))
    }

    @Test
    fun `getBodyCorporateStatistics should return 200 OK with statistics`() {
        val statistics =
            BodyCorporateService.BodyCorporateStatistics(
                totalBodyCorporates = 10,
                totalCombinedBudget = BigDecimal("100000.00"),
            )

        `when`(bodyCorporateService.getBodyCorporateStatistics()).thenReturn(statistics)

        mockMvc
            .perform(get("/api/body-corporates/statistics"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.totalBodyCorporates").value(10))

        verify(bodyCorporateService).getBodyCorporateStatistics()
    }

    @Test
    fun `passwordResetRequest should return 200 OK when request is successful`() {
        val request = BodyCorporateController.PasswordResetRequest(email = testEmail)

        mockMvc
            .perform(
                post("/api/body-corporates/auth/password-reset-request")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.message").value("Password reset code sent to your email."))

        verify(cognitoService).initiatePasswordReset(testEmail)
    }

    @Test
    fun `passwordResetConfirm should return 200 OK when confirmation is successful`() {
        val request =
            BodyCorporateController.PasswordResetConfirmRequest(
                email = testEmail,
                confirmationCode = "123456",
                newPassword = "newpassword123",
            )

        mockMvc
            .perform(
                post("/api/body-corporates/auth/password-reset-confirm")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)),
            ).andExpect(status().isOk)
            .andExpect(jsonPath("$.message").value("Password has been reset successfully."))

        verify(cognitoService).confirmPasswordReset(testEmail, "123456", "newpassword123")
    }
}
