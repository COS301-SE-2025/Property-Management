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
                primaryContractor = dto.primaryContractor,
                latestInspectionDate = dto.latestInspectionDate,
                propertyImage = dto.propertyImageId,
                trusteeUuid = dto.trusteeUuid,
                area = dto.area!!,
                coporateUuid = dto.coporateUuid,
            )

        val savedBuilding = buildingRepository.save(building)
        return mapToResponseDto(savedBuilding)
    }

    fun getAllBuildings(): List<BuildingResponseDto> = buildingRepository.findAll().map { mapToResponseDto(it) }

    fun getBuildingByUuid(uuid: UUID): BuildingResponseDto? = buildingRepository.findById(uuid).orElse(null)?.let { mapToResponseDto(it) }

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
                primaryContractor = dto.primaryContractor ?: existingBuilding.primaryContractor,
                latestInspectionDate = dto.latestInspectionDate ?: existingBuilding.latestInspectionDate,
                propertyImage = propertyImageUrl,
                area = dto.area ?: existingBuilding.area,
                trusteeUuid = dto.trusteeUuid ?: existingBuilding.trusteeUuid,
                coporateUuid = dto.coporateUuid ?: existingBuilding.coporateUuid,
            )

        val savedBuilding = buildingRepository.save(updatedBuilding)
        return mapToResponseDto(savedBuilding)
    }

    fun deleteBuilding(uuid: UUID): Boolean =
        if (buildingRepository.existsById(uuid)) {
            buildingRepository.deleteById(uuid)
            true
        } else {
            false
        }

    fun getBuildingsByTrustee(trusteeUuid: UUID): BuildingByTrusteeDto {
        val buildings =
            buildingRepository
                .findByTrusteeUuid(trusteeUuid)
                .map { mapToResponseDto(it) }

        return BuildingByTrusteeDto(
            trusteeUuid = trusteeUuid,
            buildings = buildings,
        )
    }

    fun searchBuildingsByName(name: String): List<BuildingResponseDto> =
        buildingRepository
            .findBuildingsByNameContaining(name)
            .map { mapToResponseDto(it) }

    fun getBuildingsByType(type: String): List<BuildingResponseDto> =
        buildingRepository
            .findBuildingsByType(type)
            .map { mapToResponseDto(it) }

    private fun mapToResponseDto(building: Building): BuildingResponseDto =
        BuildingResponseDto(
            name = building.name,
            address = building.address,
            type = building.type,
            propertyValue = building.propertyValue,
            primaryContractor = building.primaryContractor,
            latestInspectionDate = building.latestInspectionDate,
            propertyImage = building.propertyImage,
            area = building.area,
            buildingUuid = building.buildingUuid,
            trusteeUuid = building.trusteeUuid,
            coporateUuid = building.coporateUuid,
        )
}
