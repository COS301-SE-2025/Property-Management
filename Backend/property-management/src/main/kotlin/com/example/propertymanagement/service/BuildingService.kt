package com.example.propertymanagement.service

import com.example.propertymanagement.dto.BuildingByTrusteeDto
import com.example.propertymanagement.dto.BuildingCreateDto
import com.example.propertymanagement.dto.BuildingResponseDto
import com.example.propertymanagement.dto.BuildingUpdateDto
import com.example.propertymanagement.model.Building
import com.example.propertymanagement.repository.BuildingRepository
import com.example.propertymanagement.repository.ImageRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Service
@Transactional
class BuildingService(
    private val buildingRepository: BuildingRepository,
    private val imageRepository: ImageRepository,
) {
    fun createBuilding(dto: BuildingCreateDto): BuildingResponseDto {
        val propertyImageUrl =
            dto.propertyImageId?.let {
                imageRepository.findById(it).orElse(null)?.url
            }

        val building =
            Building(
                name = dto.name,
                address = dto.address,
                type = dto.type,
                propertyValue = dto.propertyValue,
                primaryContractors = dto.primaryContractors,
                latestInspectionDate = dto.latestInspectionDate,
                propertyImage = propertyImageUrl,
                complexName = dto.complexName,
                trusteeUuid = dto.trusteeUuid,
            )

        val savedBuilding = buildingRepository.save(building)
        return mapToResponseDto(savedBuilding)
    }

    fun getAllBuildings(): List<BuildingResponseDto> {
        return buildingRepository.findAll().map { mapToResponseDto(it) }
    }

    fun getBuildingByUuid(uuid: UUID): BuildingResponseDto? {
        return buildingRepository.findById(uuid).orElse(null)?.let { mapToResponseDto(it) }
    }

    fun updateBuilding(
        uuid: UUID,
        dto: BuildingUpdateDto,
    ): BuildingResponseDto? {
        val existingBuilding = buildingRepository.findById(uuid).orElse(null) ?: return null

        val propertyImageUrl =
            dto.propertyImageId?.let {
                imageRepository.findById(it).orElse(null)?.url
            } ?: existingBuilding.propertyImage

        val updatedBuilding =
            existingBuilding.copy(
                name = dto.name ?: existingBuilding.name,
                address = dto.address ?: existingBuilding.address,
                type = dto.type ?: existingBuilding.type,
                propertyValue = dto.propertyValue ?: existingBuilding.propertyValue,
                primaryContractors = dto.primaryContractors ?: existingBuilding.primaryContractors,
                latestInspectionDate = dto.latestInspectionDate ?: existingBuilding.latestInspectionDate,
                propertyImage = propertyImageUrl,
                complexName = dto.complexName ?: existingBuilding.complexName,
                trusteeUuid = dto.trusteeUuid ?: existingBuilding.trusteeUuid,
            )

        val savedBuilding = buildingRepository.save(updatedBuilding)
        return mapToResponseDto(savedBuilding)
    }

    fun deleteBuilding(uuid: UUID): Boolean {
        return if (buildingRepository.existsById(uuid)) {
            buildingRepository.deleteById(uuid)
            true
        } else {
            false
        }
    }

    fun getBuildingsByTrustee(trusteeUuid: UUID): BuildingByTrusteeDto {
        val buildings =
            buildingRepository.findByTrusteeUuid(trusteeUuid)
                .map { mapToResponseDto(it) }

        return BuildingByTrusteeDto(
            trusteeUuid = trusteeUuid,
            buildings = buildings,
        )
    }

    fun searchBuildingsByName(name: String): List<BuildingResponseDto> {
        return buildingRepository.findBuildingsByNameContaining(name)
            .map { mapToResponseDto(it) }
    }

    fun getBuildingsByType(type: String): List<BuildingResponseDto> {
        return buildingRepository.findBuildingsByType(type)
            .map { mapToResponseDto(it) }
    }

    private fun mapToResponseDto(building: Building): BuildingResponseDto {
        return BuildingResponseDto(
            name = building.name,
            address = building.address,
            type = building.type,
            propertyValue = building.propertyValue,
            primaryContractors = building.primaryContractors,
            latestInspectionDate = building.latestInspectionDate,
            propertyImage = building.propertyImage,
            complexName = building.complexName,
            buildingUuid = building.buildingUuid,
            trusteeUuid = building.trusteeUuid,
        )
    }
}
