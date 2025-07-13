package com.example.propertymanagement.service

import com.example.propertymanagement.dto.InviteDTO
import com.example.propertymanagement.model.TrusteeBodyCorporateInvite
import com.example.propertymanagement.repository.TrusteeBodyCorporateInviteRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class TrusteeBodyCorporateInviteService(
    private val inviteRepository: TrusteeBodyCorporateInviteRepository
) {

    fun createInvite(dto: InviteDTO): InviteDTO {
        val entity = TrusteeBodyCorporateInvite(
            trusteeUuid = dto.trusteeUuid,
            coporateUuid = dto.coporateUuid
        )
        return inviteRepository.save(entity).toDTO()
    }

    fun getInviteById(inviteUuid: UUID): InviteDTO? =
        inviteRepository.findById(inviteUuid).orElse(null)?.toDTO()

    fun getInvitesForTrustee(trusteeUuid: UUID): List<InviteDTO> =
        inviteRepository.findAllByTrusteeUuid(trusteeUuid).map { it.toDTO() }

    fun updateInviteStatus(inviteUuid: UUID, status: String): InviteDTO? {
        val invite = inviteRepository.findById(inviteUuid).orElse(null) ?: return null
        val updated = invite.copy(status = status)
        return inviteRepository.save(updated).toDTO()
    }
}

fun TrusteeBodyCorporateInvite.toDTO() = InviteDTO(
    inviteUuid = this.inviteUuid,
    trusteeUuid = this.trusteeUuid,
    coporateUuid = this.coporateUuid,
    status = this.status,
    invitedOn = this.invitedOn
)