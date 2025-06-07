package com.example.propertymanagement.service

import com.example.propertymanagement.dto.BuildingDetailsResponse
import com.example.propertymanagement.dto.MaintenanceTaskDto
import com.example.propertymanagement.repository.BuildingDetailsRepository
import org.springframework.stereotype.Service

@Service
class BuildingDetailsService(
    private val repo: BuildingDetailsRepository,
) {
    fun getBuildingDetails(buildingId: Long): BuildingDetailsResponse? {
        val buildingBudget = repo.findBuildingBudgetDetails(buildingId).firstOrNull() ?: return null

        val maintenanceTasks =
            repo.findMaintenanceTasksByBuildingId(buildingId).map {
                MaintenanceTaskDto(
                    title = it[0] as String,
                    description = it[1] as String,
                    status = it[2] as String,
                    approved = it[3] as Boolean,
                    proofImages = (it[4] as? Array<*>)?.map { img -> img as String },
                )
            }

        return BuildingDetailsResponse(
            name = buildingBudget[0] as String,
            address = buildingBudget[1] as String,
            totalBudget = (buildingBudget[2] as Number).toDouble(),
            maintenanceBudget = (buildingBudget[3] as Number).toDouble(),
            inventoryBudget = (buildingBudget[4] as Number).toDouble(),
            inventorySpent = (buildingBudget[5] as Number).toDouble(),
            maintenanceSpent = (buildingBudget[6] as Number).toDouble(),
            maintenanceTasks = maintenanceTasks,
        )
    }
}
