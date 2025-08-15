package com.example.propertymanagement.service

import com.example.propertymanagement.model.ContractorCorporate
import com.example.propertymanagement.repository.ContractorCorporateRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.NoSuchElementException
import java.util.UUID

@Service
class ContractorCorporateService(
    private val repository: ContractorCorporateRepository,
) {
    fun getAll(): List<ContractorCorporate> = repository.findAll()

    fun getByUuid(uuid: UUID): ContractorCorporate =
        repository.findByContractorUuid(uuid).orElseThrow { NoSuchElementException("ContractorCorporate not found: $uuid") }

    fun updateByUuid(
        uuid: UUID,
        update: ContractorCorporate,
    ): ContractorCorporate {
        val existing = getByUuid(uuid)

        val updated =
            existing.copy(
                contractorUuid = update.contractorUuid ?: existing.contractorUuid,
                bodyCorporateUuid = update.bodyCorporateUuid ?: existing.bodyCorporateUuid,
            )

        return repository.save(updated)
    }

    @Transactional
    fun deleteByUuid(uuid: UUID) = repository.deleteByContractorUuid(uuid)

    fun add(item: ContractorCorporate): ContractorCorporate = repository.save(item)

    fun addUser(
        contractorUuid: UUID,
        bodyCorporateUuid: UUID,
    ): ContractorCorporate {
        val newUser =
            ContractorCorporate(
                contractorUuid = contractorUuid,
                bodyCorporateUuid = bodyCorporateUuid,
            )
        return add(newUser)
    }

    fun getContractorCorporatesByCorporateUuid(bodyCorporateUuid: UUID): List<ContractorCorporate> =
        repository.findContractorsByBodyCorporateUuid(bodyCorporateUuid)

    fun getContractorInCorporates(bodyCorporateUuid: UUID): List<ContractorCorporate> =
        repository.findContractorsInBodyCorporateUuid(bodyCorporateUuid)

    fun getContractorUuidsByBodyCorporateUuid(bodyCorporateUuid: UUID): List<UUID> =
        repository
            .findContractorsByBodyCorporateUuid(bodyCorporateUuid)
            .map { it.contractorUuid }
}
