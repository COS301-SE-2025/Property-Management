package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Contractor
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.Optional
import java.util.UUID

interface ContractorRepository : JpaRepository<Contractor, UUID> {
    fun findByUuid(uuid: UUID): Optional<Contractor>

    fun deleteByUuid(uuid: UUID)

    fun findByEmail(email: String): Optional<Contractor>

    @Query("SELECT c FROM Contractor c WHERE c.corporateUuid =:corporateUuid")
    fun findContractorsByCorporateUuid(
        @Param("corporateUuid") corporateUuid: UUID,
    ): List<Contractor>
}
