package com.example.propertymanagement.repository

import com.example.propertymanagement.dto.InviteWithTrusteeDto
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface TrusteeBodyCorporateInviteRepository : CrudRepository<TrusteeBodyCorporateInvite, UUID> {
    @Query("""
        SELECT new your.package.dto.InviteWithTrusteeDto(
            i.inviteUuid, i.status, i.invitedOn,
            t.trusteeUuid, t.name, t.email, t.role
        )
        FROM TrusteeBodyCorporateInvite i
        JOIN Trustee t ON i.trusteeUuid = t.trusteeUuid
    """)
    fun findAllWithTrustee(): List<InviteWithTrusteeDto>
}