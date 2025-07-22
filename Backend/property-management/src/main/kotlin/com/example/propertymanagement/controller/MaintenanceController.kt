package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Maintenance
import com.example.propertymanagement.service.MaintenanceService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
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
}
