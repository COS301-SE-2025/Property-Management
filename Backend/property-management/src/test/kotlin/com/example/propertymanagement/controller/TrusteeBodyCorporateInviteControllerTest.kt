package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.InviteDTO
import com.example.propertymanagement.service.TrusteeBodyCorporateInviteService
import com.fasterxml.jackson.databind.ObjectMapper
import org.hamcrest.Matchers.hasSize
import org.hamcrest.Matchers.`is`
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
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
import java.util.UUID
import java.util.Date

@WebMvcTest(TrusteeBodyCorporateInviteController::class)
class TrusteeBodyCorporateInviteControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var objectMapper: ObjectMapper

    @MockBean
    private lateinit var inviteService: TrusteeBodyCorporateInviteService

    private val trusteeUuid = UUID.randomUUID()
    private val corporateUuid = UUID.randomUUID()
    private val inviteUuid = UUID.randomUUID()

    @Test
    fun `should create invite`() {
        val dto = InviteDTO(null, trusteeUuid, corporateUuid)
        val savedDto = dto.copy(inviteUuid = inviteUuid, status = "PENDING")

        `when`(inviteService.createInvite(dto)).thenReturn(savedDto)

        mockMvc.perform(
            post("/api/invites")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto))
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.inviteUuid", `is`(inviteUuid.toString())))
            .andExpect(jsonPath("$.status", `is`("PENDING")))
    }

    @Test
    fun `should get invite by id`() {
        val dto = InviteDTO(inviteUuid, trusteeUuid, corporateUuid, "PENDING", Date())

        `when`(inviteService.getInviteById(inviteUuid)).thenReturn(dto)

        mockMvc.perform(get("/api/invites/$inviteUuid"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.inviteUuid", `is`(inviteUuid.toString())))
            .andExpect(jsonPath("$.status", `is`("PENDING")))
    }

    // @Test
    // fun `should return 404 for missing invite`() {
    //     `when`(inviteService.getInviteById(inviteUuid)).thenReturn(null)

    //     mockMvc.perform(get("/api/invites/$inviteUuid"))
    //         .andExpect(status().isNotFound)
    // }

    @Test
    fun `should get invites for trustee`() {
        val dto = InviteDTO(inviteUuid, trusteeUuid, corporateUuid, "PENDING", Date())

        `when`(inviteService.getInvitesForTrustee(trusteeUuid)).thenReturn(listOf(dto))

        mockMvc.perform(get("/api/invites/trustee/$trusteeUuid"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$", hasSize<Any>(1)))
            .andExpect(jsonPath("$[0].inviteUuid", `is`(inviteUuid.toString())))
    }

    @Test
    fun `should update invite status`() {
        val updatedDto = InviteDTO(inviteUuid, trusteeUuid, corporateUuid, "ACCEPTED", Date())

        `when`(inviteService.updateInviteStatus(inviteUuid, "ACCEPTED")).thenReturn(updatedDto)

        mockMvc.perform(
            put("/api/invites/$inviteUuid/status")
                .param("status", "ACCEPTED")
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.status", `is`("ACCEPTED")))
    }

    @Test
    fun `should return 400 for invalid UUID`() {
        mockMvc.perform(get("/api/invites/invalid-uuid"))
            .andExpect(status().isBadRequest)
    }

    @Test
    fun `should return 400 when creating invite with missing fields`() {
        val invalidPayload = """{ "trusteeUuid": null, "coporateUuid": null }"""

        mockMvc.perform(
            post("/api/invites")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidPayload)
        )
            .andExpect(status().isBadRequest)
    }

    // @Test
    // fun `should return 404 when updating status of missing invite`() {
    //     `when`(inviteService.updateInviteStatus(inviteUuid, "ACCEPTED")).thenReturn(null)

    //     mockMvc.perform(
    //         put("/api/invites/$inviteUuid/status")
    //             .param("status", "ACCEPTED")
    //     )
    //         .andExpect(status().isNotFound)
    // }
}
