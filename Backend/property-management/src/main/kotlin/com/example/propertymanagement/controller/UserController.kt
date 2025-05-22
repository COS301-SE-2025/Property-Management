package com.example.propertymanagement.controller

import com.example.propertymanagement.model.User
import com.example.propertymanagement.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/user")
class UserController(private val service: UserService) {

    @GetMapping
    fun getAll(): List<User> = service.getAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): User = service.getById(id)

    data class UserDto(
        val name: String,
        val email: String,
        val phone: String,
        val cognito_id: String
    )

    @PostMapping
    fun createUser(@RequestBody userDto: UserDto): User {
        return service.addUser(userDto.name, userDto.email, userDto.phone, userDto.cognito_id)
    }


    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody item: User): User =
        service.update(id, item)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }
}
