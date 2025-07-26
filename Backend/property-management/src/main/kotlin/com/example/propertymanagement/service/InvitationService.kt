package com.example.propertymanagement.service

import org.springframework.stereotype.Service
import com.example.propertymanagement.dto.InviteWithTrusteeDto
import com.example.propertymanagement.repository.TrusteeBodyCorporateInviteRepository

@Service
class InvitationService(
    private val inviteRepo: TrusteeBodyCorporateInviteRepository
) {
    fun getAllInvites(): List<InviteWithTrusteeDto> = inviteRepo.findAllWithTrustee()
}