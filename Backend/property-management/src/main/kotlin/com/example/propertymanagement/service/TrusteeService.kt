package com.example.propertymanagement.service

import com.example.propertymanagement.model.Trustee
import com.example.propertymanagement.repository.TrusteeRepository
import org.springframework.stereotype.Service

@Service
class TrusteeService(private val repository: TrusteeRepository) {

    fun getAll(): List<Trustee> = repository.findAll()

    fun getById(id: Long): Trustee =
        repository.findById(id).orElseThrow { NoSuchElementException("Item not found: $id") }

    fun add(item: Trustee): Trustee = repository.save(item)

    fun addUser(name: String, email: String, phone: String, apikey: String): Trustee {
        val newUser = Trustee(name = name, email = email, phone = phone, apikey = apikey)
        return add(newUser)
    }

    fun update(id: Long, newItem: Trustee): Trustee {
        val existing = getById(id)
        val updated = existing.copy(
            name = newItem.name,
            email = newItem.email,
            phone = newItem.phone,
            apikey = newItem.apikey
        )
        return repository.save(updated)
    }

    fun delete(id: Long) = repository.deleteById(id)
}
