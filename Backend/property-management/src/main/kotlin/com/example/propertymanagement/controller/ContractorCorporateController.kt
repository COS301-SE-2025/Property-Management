package com.example.propertymanagement.controller

import com.example.propertymanagement.model.ContractorCorporate
import com.example.propertymanagement.service.ContractorCorporateService
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
@RequestMapping("/api/contractorCorporate")
class ContractorCorporateController(
    private val service: ContractorCorporateService,
    private val contractorCorporateService: ContractorCorporateService,
) {
    @GetMapping()
    fun getAll(): List<ContractorCorporate> = service.getAll()

    @GetMapping("/{uuid}")
    fun getByUuid(
        @PathVariable uuid: UUID,
    ): ResponseEntity<ContractorCorporate> =
        try {
            val contractorCorporate = service.getByUuid(uuid)
            ResponseEntity.ok(contractorCorporate)
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        }
    
     @GetMapping("/list/{uuid}")
    fun getList(
        @PathVariable uuid: UUID,
    ): ResponseEntity<List<ContractorCorporate>> =
        try {
            val contractorCorporate = service.getContractorInCorporates(uuid)
            ResponseEntity.ok(contractorCorporate)
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        }

    data class ContractorCorporateDto(
        val contractorUuid: UUID,
        val bodyCorporateUuid: UUID,
    )

    @PostMapping
    fun createUser(
        @RequestBody contractorCorporate: ContractorCorporateDto,
    ): ContractorCorporate =
        service.addUser(
            contractorCorporate.contractorUuid,
            contractorCorporate.bodyCorporateUuid,
        )

    @PutMapping("/{uuid}")
    fun update(
        @PathVariable uuid: UUID,
        @RequestBody item: ContractorCorporate,
    ): ContractorCorporate = service.updateByUuid(uuid, item)

    @DeleteMapping("/{uuid}")
    fun delete(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Void> {
        service.deleteByUuid(uuid)
        return ResponseEntity.noContent().build()
    }

}
