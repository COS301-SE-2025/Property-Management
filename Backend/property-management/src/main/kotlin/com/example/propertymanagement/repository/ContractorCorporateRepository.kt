package com.example.propertymanagement.repository

import com.example.propertymanagement.model.ContractorCorporate
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.Optional
import java.util.UUID

interface ContractorCorporateRepository : JpaRepository<ContractorCorporate, UUID> {

    fun findByContractorUuid(contractorUuid: UUID): Optional<ContractorCorporate>

    fun deleteByContractorUuid(contractorUuid: UUID)

    @Query("SELECT c FROM ContractorCorporate c WHERE c.bodyCorporateUuid =:bodyCorporateUuid")
    fun findContractorsByBodyCorporateUuid(
        @Param("bodyCorporateUuid") bodyCorporateUuid: UUID,
    ): List<ContractorCorporate>

    @Query("SELECT c FROM ContractorCorporate c WHERE c.contractorUuid =:contractorUuid")
    fun findContractorsInBodyCorporateUuid(
        @Param("contractorUuid") contractorUuid: UUID,
    ): List<ContractorCorporate>
    
}
