package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Trustee
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional
import java.util.UUID

interface TrusteeRepository : JpaRepository<Trustee, UUID> {
    fun findByTrusteeUuid(trusteeUuid: UUID): Optional<Trustee>

    fun deleteByTrusteeUuid(trusteeUuid: UUID)

    fun findByEmail(email: String): Optional<Trustee>
}
