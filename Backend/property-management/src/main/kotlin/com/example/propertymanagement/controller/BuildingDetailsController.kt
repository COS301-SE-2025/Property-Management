package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.BuildingDetailsResponse
import com.example.propertymanagement.service.BuildingDetailsService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/building")
class BuildingDetailsController(private val service: BuildingDetailsService) {
    @GetMapping("/{buildingId}/details")
    fun getBuildingDetails(
        @PathVariable buildingId: Long,
    ): ResponseEntity<BuildingDetailsResponse> {
        val details = service.getBuildingDetails(buildingId)
        return if (details != null) {
            ResponseEntity.ok(details)
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
