package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Building
import com.example.propertymanagement.service.BuildingService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.DeleteMapping
import com.example.propertymanagement.dto.BuildingCreateDto
import com.example.propertymanagement.dto.BuildingResponseDto
import com.example.propertymanagement.dto.BuildingUpdateDto
import com.example.propertymanagement.dto.BuildingByTrusteeDto
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.CrossOrigin
import java.util.UUID

@RestController
@RequestMapping("/api/buildings")
class BuildingController(
    private val buildingService: BuildingService
) {

    @PostMapping
    fun createBuilding(@RequestBody dto: BuildingCreateDto): ResponseEntity<BuildingResponseDto> {
        val building = buildingService.createBuilding(dto)
        return ResponseEntity.status(HttpStatus.CREATED).body(building)
    }

    @GetMapping
    fun getAllBuildings(): ResponseEntity<List<BuildingResponseDto>> {
        val buildings = buildingService.getAllBuildings()
        return ResponseEntity.ok(buildings)
    }

    @GetMapping("/{uuid}")
    fun getBuildingByUuid(@PathVariable uuid: UUID): ResponseEntity<BuildingResponseDto> {
        val building = buildingService.getBuildingByUuid(uuid)
        return if (building != null) {
            ResponseEntity.ok(building)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/{uuid}")
    fun updateBuilding(
        @PathVariable uuid: UUID,
        @RequestBody dto: BuildingUpdateDto
    ): ResponseEntity<BuildingResponseDto> {
        val updatedBuilding = buildingService.updateBuilding(uuid, dto)
        return if (updatedBuilding != null) {
            ResponseEntity.ok(updatedBuilding)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{uuid}")
    fun deleteBuilding(@PathVariable uuid: UUID): ResponseEntity<Unit> {
        val deleted = buildingService.deleteBuilding(uuid)
        return if (deleted) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/trustee/{trusteeUuid}")
    fun getBuildingsByTrustee(@PathVariable trusteeUuid: UUID): ResponseEntity<BuildingByTrusteeDto> {
        val result = buildingService.getBuildingsByTrustee(trusteeUuid)
        return ResponseEntity.ok(result)
    }

    @GetMapping("/search")
    fun searchBuildingsByName(@RequestParam name: String): ResponseEntity<List<BuildingResponseDto>> {
        val buildings = buildingService.searchBuildingsByName(name)
        return ResponseEntity.ok(buildings)
    }

    @GetMapping("/type/{type}")
    fun getBuildingsByType(@PathVariable type: String): ResponseEntity<List<BuildingResponseDto>> {
        val buildings = buildingService.getBuildingsByType(type)
        return ResponseEntity.ok(buildings)
    }
}
