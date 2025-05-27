package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Trustee
import com.example.propertymanagement.service.TrusteeService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/trustee")
class TrusteeController(private val service: TrusteeService) {
    @GetMapping
    fun getAll(): List<Trustee> = service.getAll()

@GetMapping("/{id}")
    fun getById(
        @PathVariable id: Int,
    ): Trustee = service.getById(id)


    data class UserDto(
        val name: String,
        val email: String,
        val phone: String,
        val apikey: String,
    )

    @PostMapping
    fun createUser(
        @RequestBody userDto: UserDto,
    ): Trustee {
        return service.addUser(userDto.name, userDto.email, userDto.phone, userDto.apikey)
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Int,
        @RequestBody item: Trustee,
    ): Trustee = service.update(id, item)

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable id: Int,
    ): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }
}
