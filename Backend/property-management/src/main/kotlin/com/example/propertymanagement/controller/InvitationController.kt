package com.example.propertymanagement.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.example.propertymanagement.dto.InviteWithTrusteeDto
import com.example.propertymanagement.service.InvitationService


@RestController
@RequestMapping("/api/invitations")
class InvitationController(
    private val invitationService: InvitationService
) {
    @GetMapping
    fun getAllInvites(): List<InviteWithTrusteeDto> = invitationService.getAllInvites()
}