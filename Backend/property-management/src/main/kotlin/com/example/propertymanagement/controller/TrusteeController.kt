package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Trustee
import com.example.propertymanagement.service.TrusteeService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.NoSuchElementException
import java.util.UUID

@RestController
@RequestMapping("/api/trustee")
class TrusteeController(
    private val service: TrusteeService,
) {
    @GetMapping
    fun getAll(): List<Trustee> = service.getAll()

    @GetMapping("/{uuid}")
    fun getByUuid(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Any> =
        try {
            val item = service.getByUuid(uuid)
            ResponseEntity.ok(item)
        } catch (ex: NoSuchElementException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf("error" to ex.message))
        }

    data class UserDto(
        val name: String,
        val email: String,
        val phone: String,
        val apikey: String,
    )

    @PostMapping
    fun createUser(
        @RequestBody userDto: UserDto,
    ): Trustee = service.addUser(userDto.name, userDto.email, userDto.phone, userDto.apikey)

    @PutMapping("/{uuid}")
    fun update(
        @PathVariable uuid: UUID,
        @RequestBody item: Trustee,
    ): Trustee = service.updateByUuid(uuid, item)

    @DeleteMapping("/{uuid}")
    fun delete(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Void> {
        service.deleteByUuid(uuid)
        return ResponseEntity.noContent().build()
    }
}
