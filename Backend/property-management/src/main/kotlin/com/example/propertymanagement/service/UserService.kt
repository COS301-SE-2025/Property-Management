package com.example.propertymanagement.service

import com.example.propertymanagement.model.User
import com.example.propertymanagement.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val repository: UserRepository) {

    fun getAll(): List<User> = repository.findAll()

    fun getById(id: Long): User =
        repository.findById(id).orElseThrow { NoSuchElementException("Item not found: $id") }

    fun add(item: User): User = repository.save(item)

    fun addUser(name: String, email: String, phone: String, cognito_id: String): User {
        val newUser = User(name = name, email = email, phone = phone, cognito_id = cognito_id)
        return add(newUser)
    }


    fun update(id: Long, newItem: User): User {
        val existing = getById(id)
        val updated = existing.copy(
            name = newItem.name,
            email = newItem.email,
            phone = newItem.phone,
            cognito_id = newItem.cognito_id
        )
        return repository.save(updated)
    }

    fun delete(id: Long) = repository.deleteById(id)
}
