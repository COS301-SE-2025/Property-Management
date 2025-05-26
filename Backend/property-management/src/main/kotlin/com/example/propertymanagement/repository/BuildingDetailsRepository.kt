package com.example.propertymanagement.repository

import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
class BuildingDetailsRepository(
    @PersistenceContext private val entityManager: EntityManager,
) {
    @Transactional(readOnly = true)
    fun findBuildingBudgetDetails(buildingId: Long): List<Array<Any>> {
        val query =
            entityManager.createNativeQuery(
                """
            SELECT b.name, b.address, 
                   bu.total_budget, bu.maintenance_budget, bu.inventory_budget, bu.inventory_spent, bu.maintenance_spent
            FROM building b
            JOIN budget bu ON b.building_id = bu.building_id
            WHERE b.building_id = :buildingId
            """,
            )
        query.setParameter("buildingId", buildingId)
        return query.resultList.map { it as Array<Any> }
    }

    @Transactional(readOnly = true)
    fun findMaintenanceTasksByBuildingId(buildingId: Long): List<Array<Any>> {
        val query =
            entityManager.createNativeQuery(
                """
            SELECT title, description, status, approved, proof_images
            FROM maintenancetask
            WHERE building_id = :buildingId
            """,
            )
        query.setParameter("buildingId", buildingId)
        return query.resultList.map { it as Array<Any> }
    }
}
