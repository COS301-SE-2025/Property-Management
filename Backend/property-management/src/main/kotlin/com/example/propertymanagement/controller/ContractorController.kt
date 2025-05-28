package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Contractor
import com.example.propertymanagement.service.ContractorService
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

@RestController
@RequestMapping("/api/contractor")
class ContractorController(
    private val service: ContractorService,
) {
    @GetMapping()
    fun getAll(): List<Contractor> = service.getAll()

    @GetMapping("/{id}")
    fun getById(
        @PathVariable id: Int,
    ): ResponseEntity<Any> =
        try {
            val item = service.getById(id)
            ResponseEntity.ok(item)
        } catch (ex: NoSuchElementException) {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(mapOf("error" to ex.message))
        }

    data class ContractorDto(
        val name: String,
        val email: String,
        val phone: String,
        val apikey: String,
        val banned: Boolean,
    )

    @PostMapping
    fun createUser(
        @RequestBody ContractorDto: ContractorDto,
    ): Contractor =
        service.addUser(ContractorDto.name, ContractorDto.email, ContractorDto.phone, ContractorDto.apikey, ContractorDto.banned)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Int,
        @RequestBody item: Contractor,
    ): Contractor = service.update(id, item)

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable id: Int,
    ): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }
}
