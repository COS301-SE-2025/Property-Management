package com.example.propertymanagement.service

import com.example.propertymanagement.model.Contractor
import com.example.propertymanagement.repository.ContractorRepository
import org.springframework.stereotype.Service

@Service
class ContractorService(private val repository: ContractorRepository) {
    fun getAll(): List<Contractor> = repository.findAll()

    fun getById(id: Long): Contractor = repository.findById(id).orElseThrow { NoSuchElementException("Item not found: $id") }

    fun add(item: Contractor): Contractor = repository.save(item)

    fun addUser(
        name: String,
        email: String,
        phone: String,
        apikey: String,
        banned: Boolean
    ): Contractor {
        val newUser = Contractor(name = name, email = email, phone = phone, apikey = apikey, banned = banned)
        return add(newUser)
    }

    fun update(
        id: Long,
        newItem: Contractor
    ): Contractor {
        val existing = getById(id)
        val updated =
            existing.copy(
                name = newItem.name,
                email = newItem.email,
                phone = newItem.phone,
                apikey = newItem.apikey,
                banned = newItem.banned
            )
        return repository.save(updated)
    }

    fun delete(id: Long) = repository.deleteById(id)
}
