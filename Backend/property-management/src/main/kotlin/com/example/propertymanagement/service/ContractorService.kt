package com.example.propertymanagement.service

import com.example.propertymanagement.model.Contractor
import com.example.propertymanagement.repository.ContractorRepository
import org.springframework.stereotype.Service
import java.util.NoSuchElementException
import java.util.UUID

@Service
class ContractorService(
    private val repository: ContractorRepository,
) {
    fun getAll(): List<Contractor> = repository.findAll()

    fun getByUuid(uuid: UUID): Contractor =
        repository.findByUuid(uuid).orElseThrow { NoSuchElementException("Contractor not found: $uuid") }

    fun updateByUuid(
        uuid: UUID,
        newItem: Contractor,
    ): Contractor {
        val existing = getByUuid(uuid)
        val updated =
            existing.copy(
                name = newItem.name, 
                contact_info = newItem.contact_info, 
                status = newItem.status, 
                apikey = newItem.apikey, 
                email = newItem.email, 
                phone = newItem.phone, 
                address = newItem.address,
                city = newItem.city,
                postal_code = newItem.postal_code,
                reg_number = newItem.reg_number,
                description = newItem.description,
                services = newItem.services
            )
        return repository.save(updated)
    }

    fun deleteByUuid(uuid: UUID) = repository.deleteByUuid(uuid)

    fun add(item: Contractor): Contractor = repository.save(item)

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
    ): Contractor {
        val newUser = Contractor(name = name, 
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
        services = services)
        return add(newUser)
    }
}
