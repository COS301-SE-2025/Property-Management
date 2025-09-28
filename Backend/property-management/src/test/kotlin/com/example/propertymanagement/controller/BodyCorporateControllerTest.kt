package com.example.propertymanagement.controller

import com.example.propertymanagement.service.BodyCorporateService
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.web.servlet.MockMvc
import java.util.UUID

@WebMvcTest(controllers = [BodyCorporateController::class])
@AutoConfigureMockMvc(addFilters = false)
class BodyCorporateControllerTest(
    @Autowired val mockMvc: MockMvc,
    @Autowired val objectMapper: ObjectMapper,
) {
    @MockBean
    lateinit var bodyCorporateService: BodyCorporateService

    private val corporateUuid = UUID.randomUUID()
    private val testEmail = "test@example.com"
    private val testCorporateName = "Test Corp"
    private val testUsername = "test_user"

    // @Test
    // fun `registerBodyCorporate should return created response`() {
    //     val request =
    //         CreateBodyCorporateRequest(
    //             corporateName = testCorporateName,
    //             contributionPerSqm = BigDecimal("100.00"),
    //             totalBudget = BigDecimal("10000.00"),
    //             email = testEmail,
    //             password = "password123",
    //             contactNumber = "+278712393826",
    //         )
    //     val response =
    //         BodyCorporateRegistrationResponse(
    //             corporateUuid = corporateUuid,
    //             corporateName = testCorporateName,
    //             email = testEmail,
    //             cognitoUserId = "cognito123",
    //             username = testUsername,
    //             emailVerificationRequired = true,
    //         )

    //     Mockito.`when`(bodyCorporateService.registerBodyCorporate(eq(request))).thenReturn(response)

    //     mockMvc
    //         .perform(
    //             MockMvcRequestBuilders
    //                 .post("/api/body-corporates/register")
    //                 .contentType(MediaType.APPLICATION_JSON)
    //                 .content(objectMapper.writeValueAsString(request)),
    //         ).andExpect(MockMvcResultMatchers.status().isCreated)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.corporateUuid").value(corporateUuid.toString()))
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.corporateName").value(testCorporateName))
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(testEmail))

    //     Mockito.verify(bodyCorporateService).registerBodyCorporate(eq(request))
    // }

    // @Test
    // fun `confirmRegistration should return success message`() {
    //     val request = ConfirmRegistrationRequest(testUsername, "123456")
    //     Mockito.doNothing().`when`(bodyCorporateService).confirmRegistration(eq(request))

    //     mockMvc
    //         .perform(
    //             MockMvcRequestBuilders
    //                 .post("/api/body-corporates/confirm-registration")
    //                 .contentType(MediaType.APPLICATION_JSON)
    //                 .content(objectMapper.writeValueAsString(request)),
    //         ).andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Registration confirmed successfully"))

    //     Mockito.verify(bodyCorporateService).confirmRegistration(eq(request))
    // }

    // @Test
    // fun `confirmRegistration should return error on failure`() {
    //     val request = ConfirmRegistrationRequest(testUsername, "123456")
    //     val errorMessage = "Invalid code"
    //     Mockito.doThrow(RuntimeException(errorMessage)).`when`(bodyCorporateService).confirmRegistration(eq(request))

    //     mockMvc
    //         .perform(
    //             MockMvcRequestBuilders
    //                 .post("/api/body-corporates/confirm-registration")
    //                 .contentType(MediaType.APPLICATION_JSON)
    //                 .content(objectMapper.writeValueAsString(request)),
    //         ).andExpect(MockMvcResultMatchers.status().isBadRequest)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.error").value(errorMessage))

    //     Mockito.verify(bodyCorporateService).confirmRegistration(eq(request))
    // }

    // @Test
    // fun `login should return login response`() {
    //     val request = LoginRequest(testEmail, "password123")
    //     val response = LoginResponse("idToken", "accessToken", "refreshToken", "BODY_CORPORATE", corporateUuid.toString())

    //     Mockito.`when`(bodyCorporateService.login(eq(request))).thenReturn(response)

    //     mockMvc
    //         .perform(
    //             MockMvcRequestBuilders
    //                 .post("/api/body-corporates/login")
    //                 .contentType(MediaType.APPLICATION_JSON)
    //                 .content(objectMapper.writeValueAsString(request)),
    //         ).andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.idToken").value("idToken"))
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value(corporateUuid.toString()))

    //     Mockito.verify(bodyCorporateService).login(eq(request))
    // }

    // @Test
    // fun `getBodyCorporateById should return body corporate when found`() {
    //     val response =
    //         BodyCorporateResponse(
    //             corporateUuid = corporateUuid,
    //             corporateName = testCorporateName,
    //             contributionPerSqm = BigDecimal("100.00"),
    //             totalBudget = BigDecimal("10000.00"),
    //             email = testEmail,
    //             userId = "user123",
    //             username = testUsername,
    //         )
    //     Mockito.`when`(bodyCorporateService.getBodyCorporateById(corporateUuid)).thenReturn(response)

    //     mockMvc
    //         .perform(MockMvcRequestBuilders.get("/api/body-corporates/$corporateUuid"))
    //         .andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.corporateUuid").value(corporateUuid.toString()))

    //     Mockito.verify(bodyCorporateService).getBodyCorporateById(corporateUuid)
    // }

    // @Test
    // fun `getBodyCorporateById should return 404 when not found`() {
    //     Mockito
    //         .`when`(bodyCorporateService.getBodyCorporateById(corporateUuid))
    //         .thenThrow(NoSuchElementException("Not found"))

    //     mockMvc
    //         .perform(MockMvcRequestBuilders.get("/api/body-corporates/$corporateUuid"))
    //         .andExpect(MockMvcResultMatchers.status().isNotFound)

    //     Mockito.verify(bodyCorporateService).getBodyCorporateById(corporateUuid)
    // }

    // @Test
    // fun `getBodyCorporateByEmail should return body corporate when found`() {
    //     val response =
    //         BodyCorporateResponse(
    //             corporateUuid = corporateUuid,
    //             corporateName = testCorporateName,
    //             contributionPerSqm = BigDecimal("100.00"),
    //             totalBudget = BigDecimal("10000.00"),
    //             email = testEmail,
    //             userId = "user123",
    //             username = testUsername,
    //         )
    //     Mockito.`when`(bodyCorporateService.getBodyCorporateByEmail(testEmail)).thenReturn(response)

    //     mockMvc
    //         .perform(MockMvcRequestBuilders.get("/api/body-corporates/email/$testEmail"))
    //         .andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(testEmail))

    //     Mockito.verify(bodyCorporateService).getBodyCorporateByEmail(testEmail)
    // }

    // @Test
    // fun `getBodyCorporateByEmail should return 404 when not found`() {
    //     Mockito
    //         .`when`(bodyCorporateService.getBodyCorporateByEmail(testEmail))
    //         .thenThrow(NoSuchElementException("Not found"))

    //     mockMvc
    //         .perform(MockMvcRequestBuilders.get("/api/body-corporates/email/$testEmail"))
    //         .andExpect(MockMvcResultMatchers.status().isNotFound)

    //     Mockito.verify(bodyCorporateService).getBodyCorporateByEmail(testEmail)
    // }

    // @Test
    // fun `getBodyCorporateByUserId should return body corporate when found`() {
    //     val userId = "user123"
    //     val response =
    //         BodyCorporateResponse(
    //             corporateUuid = corporateUuid,
    //             corporateName = testCorporateName,
    //             contributionPerSqm = BigDecimal("100.00"),
    //             totalBudget = BigDecimal("10000.00"),
    //             email = testEmail,
    //             userId = userId,
    //             username = testUsername,
    //         )
    //     Mockito.`when`(bodyCorporateService.getBodyCorporateByUserId(userId)).thenReturn(response)

    //     mockMvc
    //         .perform(MockMvcRequestBuilders.get("/api/body-corporates/user/$userId"))
    //         .andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value(userId))

    //     Mockito.verify(bodyCorporateService).getBodyCorporateByUserId(userId)
    // }

    // @Test
    // fun `getBodyCorporateByUserId should return 404 when not found`() {
    //     val userId = "user123"
    //     Mockito
    //         .`when`(bodyCorporateService.getBodyCorporateByUserId(userId))
    //         .thenThrow(NoSuchElementException("Not found"))

    //     mockMvc
    //         .perform(MockMvcRequestBuilders.get("/api/body-corporates/user/$userId"))
    //         .andExpect(MockMvcResultMatchers.status().isNotFound)

    //     Mockito.verify(bodyCorporateService).getBodyCorporateByUserId(userId)
    // }

    // @Test
    // fun `updateBodyCorporate should return updated response when successful`() {
    //     val request =
    //         UpdateBodyCorporateRequest(
    //             corporateName = "Updated Corp",
    //             contributionPerSqm = BigDecimal("200.00"),
    //             totalBudget = BigDecimal("20000.00"),
    //             email = "updated@example.com",
    //         )
    //     val response =
    //         BodyCorporateResponse(
    //             corporateUuid = corporateUuid,
    //             corporateName = "Updated Corp",
    //             contributionPerSqm = BigDecimal("200.00"),
    //             totalBudget = BigDecimal("20000.00"),
    //             email = "updated@example.com",
    //             userId = "user123",
    //             username = testUsername,
    //         )
    //     Mockito.`when`(bodyCorporateService.updateBodyCorporate(eq(corporateUuid), eq(request))).thenReturn(response)

    //     mockMvc
    //         .perform(
    //             MockMvcRequestBuilders
    //                 .put("/api/body-corporates/$corporateUuid")
    //                 .contentType(MediaType.APPLICATION_JSON)
    //                 .content(objectMapper.writeValueAsString(request)),
    //         ).andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.corporateName").value("Updated Corp"))

    //     Mockito.verify(bodyCorporateService).updateBodyCorporate(eq(corporateUuid), eq(request))
    // }

    // @Test
    // fun `updateBodyCorporate should return 404 when not found`() {
    //     val request = UpdateBodyCorporateRequest(corporateName = "Updated Corp")
    //     Mockito
    //         .`when`(bodyCorporateService.updateBodyCorporate(eq(corporateUuid), eq(request)))
    //         .thenThrow(NoSuchElementException("Not found"))

    //     mockMvc
    //         .perform(
    //             MockMvcRequestBuilders
    //                 .put("/api/body-corporates/$corporateUuid")
    //                 .contentType(MediaType.APPLICATION_JSON)
    //                 .content(objectMapper.writeValueAsString(request)),
    //         ).andExpect(MockMvcResultMatchers.status().isNotFound)

    //     Mockito.verify(bodyCorporateService).updateBodyCorporate(eq(corporateUuid), eq(request))
    // }

    // @Test
    // fun `deleteBodyCorporate should return success message`() {
    //     Mockito.doNothing().`when`(bodyCorporateService).deleteBodyCorporate(corporateUuid)

    //     mockMvc
    //         .perform(MockMvcRequestBuilders.delete("/api/body-corporates/$corporateUuid"))
    //         .andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Body corporate deleted successfully"))

    //     Mockito.verify(bodyCorporateService).deleteBodyCorporate(corporateUuid)
    // }

    // @Test
    // fun `deleteBodyCorporate should return 404 when not found`() {
    //     Mockito.doThrow(NoSuchElementException("Not found")).`when`(bodyCorporateService).deleteBodyCorporate(corporateUuid)

    //     mockMvc
    //         .perform(MockMvcRequestBuilders.delete("/api/body-corporates/$corporateUuid"))
    //         .andExpect(MockMvcResultMatchers.status().isNotFound)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.error").value("Not found"))

    //     Mockito.verify(bodyCorporateService).deleteBodyCorporate(corporateUuid)
    // }

    // @Test
    // fun `searchBodyCorporatesByName should return matching corporates`() {
    //     val response =
    //         BodyCorporateResponse(
    //             corporateUuid = corporateUuid,
    //             corporateName = testCorporateName,
    //             contributionPerSqm = BigDecimal("100.00"),
    //             totalBudget = BigDecimal("10000.00"),
    //             email = testEmail,
    //             userId = "user123",
    //             username = testUsername,
    //         )
    //     Mockito.`when`(bodyCorporateService.searchBodyCorporatesByName("test")).thenReturn(listOf(response))

    //     mockMvc
    //         .perform(
    //             MockMvcRequestBuilders
    //                 .get("/api/body-corporates/search")
    //                 .param("name", "test"),
    //         ).andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$[0].corporateName").value(testCorporateName))

    //     Mockito.verify(bodyCorporateService).searchBodyCorporatesByName("test")
    // }

    // @Test
    // fun `getBodyCorporatesByContributionRange should return matching corporates`() {
    //     val response =
    //         BodyCorporateResponse(
    //             corporateUuid = corporateUuid,
    //             corporateName = testCorporateName,
    //             contributionPerSqm = BigDecimal("100.00"),
    //             totalBudget = BigDecimal("10000.00"),
    //             email = testEmail,
    //             userId = "user123",
    //             username = testUsername,
    //         )
    //     val minContribution = BigDecimal("50.00")
    //     val maxContribution = BigDecimal("150.00")
    //     Mockito
    //         .`when`(
    //             bodyCorporateService.getBodyCorporatesByContributionRange(
    //                 eq(minContribution),
    //                 eq(maxContribution),
    //             ),
    //         ).thenReturn(listOf(response))

    //     mockMvc
    //         .perform(
    //             MockMvcRequestBuilders
    //                 .get("/api/body-corporates/filter/contribution")
    //                 .param("minContribution", "50.00")
    //                 .param("maxContribution", "150.00"),
    //         ).andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$[0].contributionPerSqm").value(100.00))

    //     Mockito.verify(bodyCorporateService).getBodyCorporatesByContributionRange(
    //         eq(minContribution),
    //         eq(maxContribution),
    //     )
    // }

    // @Test
    // fun `getBodyCorporatesByMinimumBudget should return matching corporates`() {
    //     val response =
    //         BodyCorporateResponse(
    //             corporateUuid = corporateUuid,
    //             corporateName = testCorporateName,
    //             contributionPerSqm = BigDecimal("100.00"),
    //             totalBudget = BigDecimal("10000.00"),
    //             email = testEmail,
    //             userId = "user123",
    //             username = testUsername,
    //         )
    //     val minBudget = BigDecimal("5000.00")
    //     Mockito
    //         .`when`(bodyCorporateService.getBodyCorporatesByMinimumBudget(eq(minBudget)))
    //         .thenReturn(listOf(response))

    //     mockMvc
    //         .perform(
    //             MockMvcRequestBuilders
    //                 .get("/api/body-corporates/filter/budget")
    //                 .param("minBudget", "5000.00"),
    //         ).andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$[0].totalBudget").value(10000.00))

    //     Mockito.verify(bodyCorporateService).getBodyCorporatesByMinimumBudget(eq(minBudget))
    // }

    // @Test
    // fun `getBodyCorporateStatistics should return statistics`() {
    //     val stats =
    //         BodyCorporateService.BodyCorporateStatistics(
    //             totalBodyCorporates = 10,
    //             totalCombinedBudget = BigDecimal("100000.00"),
    //         )
    //     Mockito.`when`(bodyCorporateService.getBodyCorporateStatistics()).thenReturn(stats)

    //     mockMvc
    //         .perform(MockMvcRequestBuilders.get("/api/body-corporates/statistics"))
    //         .andExpect(MockMvcResultMatchers.status().isOk)
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.totalBodyCorporates").value(10))
    //         .andExpect(MockMvcResultMatchers.jsonPath("$.totalCombinedBudget").value(100000.00))

    //     Mockito.verify(bodyCorporateService).getBodyCorporateStatistics()
    // }
}
