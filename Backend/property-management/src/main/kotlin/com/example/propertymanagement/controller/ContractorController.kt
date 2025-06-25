package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Contractor
import com.example.propertymanagement.service.ContractorService
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
@RequestMapping("/api/contractor")
class ContractorController(
    private val service: ContractorService,
) {
    @GetMapping()
    fun getAll(): List<Contractor> = service.getAll()

    @GetMapping("/{uuid}")
    fun getByUuid(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Contractor> =
        try {
            val contractor = service.getByUuid(uuid)
            ResponseEntity.ok(contractor)
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        }

    data class ContractorDto(
        val name: String,
        val email: String,
        val phone: String,
        val apikey: String,
        val status: Boolean,
    )

    @PostMapping
    fun createUser(
        @RequestBody ContractorDto: ContractorDto,
    ): Contractor =
        service.addUser(ContractorDto.name, ContractorDto.email, ContractorDto.phone, ContractorDto.apikey, ContractorDto.status)

    @PutMapping("/{uuid}")
    fun update(
        @PathVariable uuid: UUID,
        @RequestBody item: Contractor,
    ): Contractor = service.updateByUuid(uuid, item)

    @DeleteMapping("/{uuid}")
    fun delete(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Void> {
        service.deleteByUuid(uuid)
        return ResponseEntity.noContent().build()
    }
}
