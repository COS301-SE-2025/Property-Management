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
    ): ResponseEntity<Maintenance> {
        val maintenance = service.getByUuid(uuid)
        return if (maintenance != null) ResponseEntity.ok(maintenance) else ResponseEntity.notFound().build()
    }

    data class info(
        var title: String,
        var des: String,
        var status: String,
        var scheduled_date: Date,
        var created_by: Int,
        var img: String,
        var approved: Boolean,
        var building_id: Int,
    )

    @PostMapping
    fun createUser(
        @RequestBody info: info,
    ): Maintenance =
        service.add(info.title, info.des, info.status, info.scheduled_date, info.created_by, info.img, info.approved, info.building_id)

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
