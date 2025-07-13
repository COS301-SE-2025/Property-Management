package com.example.propertymanagement.repository

import com.example.propertymanagement.model.TrusteeBodyCorporateInvite
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface TrusteeBodyCorporateInviteRepository : JpaRepository<TrusteeBodyCorporateInvite, UUID> {
    fun findByTrusteeUuidAndCoporateUuid(
        trusteeUuid: UUID,
        coporateUuid: UUID,
    ): TrusteeBodyCorporateInvite?

    fun findAllByTrusteeUuid(trusteeUuid: UUID): List<TrusteeBodyCorporateInvite>
}
