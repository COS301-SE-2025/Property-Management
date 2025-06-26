package com.example.propertymanagement.service

import com.example.propertymanagement.model.Trustee
import com.example.propertymanagement.repository.TrusteeRepository
import org.springframework.stereotype.Service
import java.util.NoSuchElementException
import java.util.UUID

@Service
class TrusteeService(
    private val repository: TrusteeRepository,
) {
    fun getAll(): List<Trustee> = repository.findAll()

    fun getById(id: UUID): Trustee = repository.findById(id).orElseThrow { NoSuchElementException("Item not found: $id") }

    fun add(item: Trustee): Trustee = repository.save(item)

    fun getByUuid(uuid: UUID): Trustee =
        repository.findByTrusteeUuid(uuid).orElseThrow { NoSuchElementException("Trustee not found: $uuid") }

    fun addUser(
        name: String,
        email: String,
        phone: String,
        apikey: String,
    ): Trustee {
        val newUser = Trustee(name = name, email = email, phone = phone, apikey = apikey)
        return add(newUser)
    }

    fun updateByUuid(
        uuid: UUID,
        newItem: Trustee,
    ): Trustee {
        val existing = getByUuid(uuid)
        val updated =
            existing.copy(
                name = newItem.name,
                email = newItem.email,
                phone = newItem.phone,
                apikey = newItem.apikey,
            )
        return repository.save(updated)
    }

    fun update(
        id: UUID,
        newItem: Trustee,
    ): Trustee {
        val existing = getById(id)
        val updated =
            existing.copy(
                name = newItem.name,
                email = newItem.email,
                phone = newItem.phone,
                apikey = newItem.apikey,
            )
        return repository.save(updated)
    }

    fun deleteByUuid(uuid: UUID) = repository.deleteByTrusteeUuid(uuid)

    fun delete(id: UUID) = repository.deleteById(id)

    fun getByEmail(email: String): Trustee =
        repository.findByEmail(email).orElseThrow { NoSuchElementException("Trustee not found for email: $email") }
}
