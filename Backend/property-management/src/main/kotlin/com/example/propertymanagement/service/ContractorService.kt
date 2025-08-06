package com.example.propertymanagement.service

import com.example.propertymanagement.model.Contractor
import com.example.propertymanagement.repository.ContractorRepository
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.NoSuchElementException
import java.util.UUID

@Service
class ContractorService(
    private val repository: ContractorRepository,
) {
    @Cacheable("apiCache")
    fun getAll(): List<Contractor> = repository.findAll()

    @Cacheable(value = ["apiCache"], key = "#uuid")
    fun getByUuid(uuid: UUID): Contractor =
        repository.findByUuid(uuid).orElseThrow { NoSuchElementException("Contractor not found: $uuid") }

    @CacheEvict(value = ["apiCache"], key = "#uuid")
    fun updateByUuid(
        uuid: UUID,
        update: Contractor,
    ): Contractor {
        val existing = getByUuid(uuid)

        val updated =
            existing.copy(
                name = update.name ?: existing.name,
                contact_info = update.contact_info ?: existing.contact_info,
                status = update.status ?: existing.status,
                apikey = update.apikey ?: existing.apikey,
                email = update.email ?: existing.email,
                phone = update.phone ?: existing.phone,
                address = update.address ?: existing.address,
                city = update.city ?: existing.city,
                postal_code = update.postal_code ?: existing.postal_code,
                reg_number = update.reg_number ?: existing.reg_number,
                description = update.description ?: existing.description,
                services = update.services ?: existing.services,
                corporateUuid = update.corporateUuid ?: existing.corporateUuid,
                img = update.img ?: existing.img,
            )

        return repository.save(updated)
    }

    @Transactional
    @CacheEvict(value = ["apiCache"], key = "#uuid")
    fun deleteByUuid(uuid: UUID) = repository.deleteByUuid(uuid)

    @CacheEvict(value = ["apiCache"], allEntries = true)
    fun add(item: Contractor): Contractor = repository.save(item)

    @CacheEvict(value = ["apiCache"], allEntries = true)
    fun addUser(
        name: String,
        contact_info: String,
        status: Boolean,
        apikey: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        postal_code: String,
        reg_number: String,
        description: String,
        services: String,
        corporateUuid: UUID,
        img: UUID,
    ): Contractor {
        val newUser =
            Contractor(
                name = name,
                contact_info = contact_info,
                status = status,
                apikey = apikey,
                email = email,
                phone = phone,
                address = address,
                city = city,
                postal_code = postal_code,
                reg_number = reg_number,
                description = description,
                services = services,
                corporateUuid = corporateUuid,
                img = img,
            )
        return add(newUser)
    }

    @Cacheable(value = ["apiCache"], key = "'email_'+#email")
    fun getByEmail(email: String): Contractor =
        repository.findByEmail(email).orElseThrow { NoSuchElementException("Trustee not found for email: $email") }

    fun getContractorsByCorporateUuid(corporateUuid: UUID): List<Contractor> = repository.findContractorsByCorporateUuid(corporateUuid)
}
