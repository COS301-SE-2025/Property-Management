package com.example.propertymanagement.service

import com.example.propertymanagement.dto.BuildingCreateRequest
import com.example.propertymanagement.model.Building
import com.example.propertymanagement.repository.BuildingRepository
import org.springframework.stereotype.Service

@Service
class BuildingService(private val repository: BuildingRepository) {
    fun getAll(): List<Building> = repository.findAll()

    fun create(request: BuildingCreateRequest): Building {
        val building =
            Building(
                name = request.name,
                address = request.address,
                type = request.type,
                trustees = request.trustees,
                propertyValue = request.propertyValue,
                primaryContractors = request.primaryContractors,
                latestInspectionDate = request.latestInspectionDate,
                propertyImage = request.propertyImage,
            )
        return repository.save(building)
    }
}
