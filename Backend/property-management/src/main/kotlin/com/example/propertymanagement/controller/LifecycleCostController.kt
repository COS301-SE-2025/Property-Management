package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.CreateLifecycleCostRequest
import com.example.propertymanagement.dto.LifecycleCostResponse
import com.example.propertymanagement.dto.UpdateLifecycleCostRequest
import com.example.propertymanagement.exception.RestException
import com.example.propertymanagement.model.LifecycleCost
import com.example.propertymanagement.repository.LifecycleCostRepository
import com.example.propertymanagement.service.LifecycleCostService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.http.HttpStatus
import java.util.UUID

@RestController
@RequestMapping("/api/lifecycle-cost")
class LifecycleCostController(
    private val service: LifecycleCostService
) {

    @PostMapping
    fun create(@RequestBody request: CreateLifecycleCostRequest): ResponseEntity<LifecycleCostResponse> {
        return ResponseEntity.ok(service.create(request))
    }

    @GetMapping("/{uuid}")
    fun getById(@PathVariable uuid: UUID): ResponseEntity<LifecycleCostResponse> {
        return ResponseEntity.ok(service.getById(uuid))
    }

    @GetMapping("/coporate/{coporateUuid}")
    fun getByCoporate(@PathVariable coporateUuid: UUID): ResponseEntity<List<LifecycleCostResponse>> {
        return ResponseEntity.ok(service.getByCoporateUuid(coporateUuid))
    }

    @PutMapping("/{uuid}")
    fun update(
        @PathVariable uuid: UUID,
        @RequestBody request: UpdateLifecycleCostRequest
    ): ResponseEntity<LifecycleCostResponse> {
        return ResponseEntity.ok(service.update(uuid, request))
    }

    @DeleteMapping("/{uuid}")
    fun delete(@PathVariable uuid: UUID): ResponseEntity<Void> {
        return if (service.delete(uuid)) ResponseEntity.noContent().build()
        else ResponseEntity.notFound().build()
    }
}
