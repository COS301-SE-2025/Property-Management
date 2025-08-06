package com.example.propertymanagement.service

import com.example.propertymanagement.dto.InviteDTO
import com.example.propertymanagement.model.TrusteeBodyCorporateInvite
import com.example.propertymanagement.repository.TrusteeBodyCorporateInviteRepository
import com.example.propertymanagement.repository.TrusteeRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class TrusteeBodyCorporateInviteService(
    private val inviteRepository: TrusteeBodyCorporateInviteRepository,
    private val trusteeRepository: TrusteeRepository,
) {
    fun createInvite(dto: InviteDTO): InviteDTO {
        val entity =
            TrusteeBodyCorporateInvite(
                inviteUuid = UUID.randomUUID(),
                trusteeUuid = dto.trusteeUuid,
                coporateUuid = dto.coporateUuid,
            )
        return inviteRepository.save(entity).toDTO()
    }

    fun getInviteById(inviteUuid: UUID): InviteDTO? = inviteRepository.findById(inviteUuid).orElse(null)?.toDTO()

    fun getInvitesForTrustee(trusteeUuid: UUID): List<InviteDTO> = inviteRepository.findAllByTrusteeUuid(trusteeUuid).map { it.toDTO() }

    fun getAcceptedTrusteesForBodyCorporate(coporateUuid: UUID): List<InviteDTO> =
        inviteRepository.findAllByCoporateUuidAndStatus(coporateUuid, "ACCEPTED").map { it.toDTO() }

    fun updateInviteStatus(
        inviteUuid: UUID,
        status: String,
    ): InviteDTO? {
        val invite = inviteRepository.findById(inviteUuid).orElse(null) ?: return null
        val updated = invite.copy(status = status)
        return inviteRepository.save(updated).toDTO()
    }

    fun getAllInvitations(): List<InviteDTO> = inviteRepository.findAll().map { it.toDTOWithTrustee(trusteeRepository) }
}

fun TrusteeBodyCorporateInvite.toDTO() =
    InviteDTO(
        inviteUuid = this.inviteUuid,
        trusteeUuid = this.trusteeUuid,
        coporateUuid = this.coporateUuid,
        status = this.status,
        invitedOn = this.invitedOn,
        name = null,
        email = null,
        role = null,
    )

fun TrusteeBodyCorporateInvite.toDTOWithTrustee(trusteeRepo: TrusteeRepository) =
    InviteDTO(
        inviteUuid = this.inviteUuid,
        trusteeUuid = this.trusteeUuid,
        coporateUuid = this.coporateUuid,
        status = this.status,
        invitedOn = this.invitedOn,
        name = trusteeRepo.findByTrusteeUuid(this.trusteeUuid).orElse(null)?.name,
        email = trusteeRepo.findByTrusteeUuid(this.trusteeUuid).orElse(null)?.email,
        role = "Trustee",
    )
