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

@RestController
@RequestMapping("/api")
class ContractorController(private val service: ContractorService) {
    @GetMapping("/{contractors}")
    fun getAll(): List<Contractor> = service.getAll()

    @GetMapping("/{id}")
    fun getById(
        @PathVariable id: Long,
    ): Contractor = service.getById(id)

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
    ): Contractor {
        return service.addUser(ContractorDto.name, ContractorDto.email, ContractorDto.phone, ContractorDto.apikey, ContractorDto.banned)
    }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody item: Contractor,
    ): Contractor = service.update(id, item)

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable id: Long,
    ): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }
}
