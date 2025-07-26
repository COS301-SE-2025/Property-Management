package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.MaintenanceTaskCreateDto
import com.example.propertymanagement.dto.MaintenanceTaskResponseDto
import com.example.propertymanagement.dto.MaintenanceTaskUpdateDto
import com.example.propertymanagement.model.Maintenance
import com.example.propertymanagement.model.MaintenancetaskContractor
import com.example.propertymanagement.service.MaintenanceService
import com.example.propertymanagement.service.MaintenanceService.QuoteCreateDto
import com.example.propertymanagement.service.MaintenanceService.TaskContractorAssignDto
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.Date
import java.util.UUID

@RestController
@RequestMapping("/api/maintenance")
class MaintenanceController(
    private val service: MaintenanceService,
) {
    @GetMapping
    fun getAll(): List<Maintenance> = service.getAll()

    @GetMapping("/{uuid}")
    fun getByUuid(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Maintenance> = ResponseEntity.ok(service.getByUuid(uuid))

    @GetMapping("/trustee/{tUuid}")
    fun getTaskByTrustee(
        @PathVariable tUuid: UUID,
    ): ResponseEntity<List<Maintenance>> = ResponseEntity.ok(service.getTasksByTrustee(tUuid))

    data class Info(
        val title: String,
        val des: String,
        val status: String,
        val scheduled_date: Date,
        val approved: Boolean,
        val bUuid: UUID,
        val img: UUID,
        val tUuid: UUID,
        val cUuid: UUID,
        val approvalStatus: String,
    )

    @PostMapping
    fun createUser(
        @RequestBody info: Info,
    ): Maintenance =
        service.add(
            info.title,
            info.des,
            info.status,
            java.sql.Date(info.scheduled_date.time),
            info.approved,
            info.bUuid,
            info.img,
            info.tUuid,
            info.cUuid,
        )

    @PutMapping("/{uuid}")
    fun update(
        @PathVariable uuid: UUID,
        @RequestBody item: Maintenance,
    ): Maintenance = service.updateByUuid(uuid, item)

    @DeleteMapping("/{uuid}")
    fun delete(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Void> {
        service.deleteByUuid(uuid)
        return ResponseEntity.noContent().build()
    }

    @PostMapping("/create")
    fun createTask(
        @RequestBody dto: MaintenanceTaskCreateDto,
        @RequestHeader("isOwner") isOwner: Boolean,
        @RequestHeader("isBodyCorporate") isBodyCorporate: Boolean,
    ): ResponseEntity<MaintenanceTaskResponseDto> {
        val task = service.createTask(dto, isOwner, isBodyCorporate)
        return ResponseEntity.status(HttpStatus.CREATED).body(task)
    }

    @PutMapping("/update/{uuid}")
    fun updateTask(
        @PathVariable uuid: UUID,
        @RequestBody dto: MaintenanceTaskUpdateDto,
        @RequestHeader("isBodyCorporate") isBodyCorporate: Boolean,
    ): ResponseEntity<MaintenanceTaskResponseDto> {
        val updatedTask = service.updateTask(uuid, dto, isBodyCorporate)
        return ResponseEntity.ok(updatedTask)
    }

    @PostMapping("/assign-contractors")
    fun assignContractors(
        @RequestBody dto: MaintenanceService.TaskContractorAssignDto,
        @RequestHeader("isBodyCorporate") isBodyCorporate: Boolean,
    ): ResponseEntity<Unit> {
        service.assignContractorsToTask(dto, isBodyCorporate)
        return ResponseEntity.noContent().build()
    }

    @GetMapping("/corporate/{coporateUuid}")
    fun getTasksByCorporate(
        @PathVariable coporateUuid: UUID,
    ): ResponseEntity<List<MaintenanceTaskResponseDto>> {
        val tasks = service.getTasksByCorporate(coporateUuid)
        return ResponseEntity.ok(tasks)
    }

    @GetMapping("/contractor/{contractorUuid}")
    fun getTasksForContractor(
        @PathVariable contractorUuid: UUID,
    ): ResponseEntity<List<MaintenanceTaskResponseDto>> {
        val tasks = service.getTasksForContractor(contractorUuid)
        return ResponseEntity.ok(tasks)
    }

    @GetMapping("/{taskUuid}/contractors")
    fun getContractorsForTask(
        @PathVariable taskUuid: UUID,
    ): ResponseEntity<List<MaintenancetaskContractor>> {
        val contractors = service.getContractorsForTask(taskUuid)
        return ResponseEntity.ok(contractors)
    }

    @PostMapping("/quotes")
    fun submitQuote(
        @RequestBody quoteDto: MaintenanceService.QuoteCreateDto,
    ): ResponseEntity<Unit> {
        service.submitQuote(quoteDto)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }
}
