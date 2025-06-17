package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.BuildingCreateRequest
import com.example.propertymanagement.model.Building
import com.example.propertymanagement.service.BuildingService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/buildings")
class BuildingController(
    private val service: BuildingService,
) {
    @GetMapping
    fun getAll(): List<Building> = service.getAll()

    @PostMapping
    fun create(
        @RequestBody request: BuildingCreateRequest,
    ): Building = service.create(request)

    @GetMapping("/trustee/{trusteeUuid}")
    fun getByTrusteeUuid(
        @PathVariable trusteeUuid: UUID,
    ): List<Building> = service.getByTrusteeUuid(trusteeUuid)

    // @GetMapping("/uuid/{buildingUuid}")
    // fun getByUuid(
    //     @PathVariable buildingUuid: String,
    // ): Building? = service.getByUuid(buildingUuid)

    // @GetMapping("/trustee/{trusteeId}")
    // fun getByTrusteeId(
    //     @PathVariable trusteeId: Int,
    // ): List<Building> = service.getByTrusteeId(trusteeId)

    // @GetMapping("/{buildingId}")
    // fun getBuildingById(@PathVariable buildingId: )
}
