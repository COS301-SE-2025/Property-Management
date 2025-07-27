package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.InviteDTO
import com.example.propertymanagement.service.TrusteeBodyCorporateInviteService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/invites")
class TrusteeBodyCorporateInviteController(
    private val inviteService: TrusteeBodyCorporateInviteService,
) {
    @PostMapping
    fun createInvite(
        @RequestBody dto: InviteDTO,
    ): InviteDTO = inviteService.createInvite(dto)

    @GetMapping("/{inviteUuid}")
    fun getInvite(
        @PathVariable inviteUuid: UUID,
    ): InviteDTO? = inviteService.getInviteById(inviteUuid)

    @GetMapping("/trustee/{trusteeUuid}")
    fun getInvitesForTrustee(
        @PathVariable trusteeUuid: UUID,
    ): List<InviteDTO> = inviteService.getInvitesForTrustee(trusteeUuid)

    @GetMapping("/body-corporate/{coporateUuid}/accepted-trustees")
    fun getAcceptedTrusteesForBodyCorporate(
        @PathVariable coporateUuid: UUID,
    ): List<InviteDTO> = inviteService.getAcceptedTrusteesForBodyCorporate(coporateUuid)

    @PutMapping("/{inviteUuid}/status")
    fun updateInviteStatus(
        @PathVariable inviteUuid: UUID,
        @RequestParam status: String,
    ): InviteDTO? = inviteService.updateInviteStatus(inviteUuid, status)
}
