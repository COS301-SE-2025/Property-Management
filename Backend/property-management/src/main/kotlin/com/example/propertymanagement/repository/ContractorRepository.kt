package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Contractor
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional
import java.util.UUID

interface ContractorRepository : JpaRepository<Contractor, Int> {
    fun findByContractorUuid(uuid: UUID): Optional<Contractor>
    fun deleteByContractorUuid(uuid: UUID)
}
