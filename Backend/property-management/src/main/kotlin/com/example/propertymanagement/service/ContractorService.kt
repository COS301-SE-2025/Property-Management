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

    fun getByUuid(uuid: UUID): Contractor =repository.findByUuid(uuid).orElseThrow { NoSuchElementException("Contractor not found: $uuid") }

    fun updateByUuid(
        uuid: UUID,
        newItem: Contractor,
    ): Contractor {
        val existing = getByUuid(uuid)
        val updated =
            existing.copy(
                name = newItem.name,
                email = newItem.email,
                phone = newItem.phone,
                apikey = newItem.apikey,
                banned = newItem.banned,
            )
        return repository.save(updated)
    }

    fun deleteByUuid(uuid: UUID) = repository.deleteByUuid(uuid)

    fun add(item: Contractor): Contractor = repository.save(item)

    fun addUser(
        name: String,
        email: String,
        phone: String,
        apikey: String,
        banned: Boolean,
    ): Contractor {
        val newUser = Contractor(name = name, email = email, phone = phone, apikey = apikey, banned = banned)
        return add(newUser)
    }

}
