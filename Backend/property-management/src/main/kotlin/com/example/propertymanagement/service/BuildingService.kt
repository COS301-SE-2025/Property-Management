package com.example.propertymanagement.service

import com.example.propertymanagement.dto.BuildingCreateRequest
import com.example.propertymanagement.model.Building
import com.example.propertymanagement.repository.BuildingRepository
import org.springframework.stereotype.Service
import org.springframework.http.HttpStatus
import java.util.UUID
import com.example.propertymanagement.exception.RestException

@Service
class BuildingService(
    private val repository: BuildingRepository,
) {
    fun getAll(): List<Building> = repository.findAll()

    fun create(request: BuildingCreateRequest): Building {
        val building =
            Building(
                buildingUuid = UUID.randomUUID(),
                name = request.name,
                address = request.address,
                type = request.type,
                propertyValue = request.propertyValue,
                primaryContractors = request.primaryContractors,
                latestInspectionDate = request.latestInspectionDate,
                propertyImage = request.propertyImage,
            )
        return repository.save(building)
    }

     fun getByBuildingUuid(buildingUuid: UUID): Building {
        return repository.findByBuildingUuid(buildingUuid)
            ?: throw RestException(HttpStatus.NOT_FOUND, "Building not found: $buildingUuid")
    }

    fun getByTrusteeUuid(trusteeUuid: UUID): List<Building> {
        val buildings = repository.findByTrusteeUuid(trusteeUuid)
        if (buildings.isEmpty()){
            throw RestException(HttpStatus.NOT_FOUND, "No buildings found for trustee: $trusteeUuid")
        }
        return buildings
    }
}
