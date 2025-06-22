package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Building
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.data.repository.query.Param
import java.util.UUID

@Repository
interface BuildingRepository : JpaRepository<Building, UUID> {
    
    fun findByTrusteeUuid(trusteeUuid: UUID): List<Building>
    
    @Query("SELECT b FROM Building b WHERE b.trusteeUuid = :trusteeUuid")
    fun findBuildingsByTrusteeUuid(@Param("trusteeUuid") trusteeUuid: UUID): List<Building>
    
    @Query("SELECT b FROM Building b WHERE b.name ILIKE %:name%")
    fun findBuildingsByNameContaining(@Param("name") name: String): List<Building>
    
    @Query("SELECT b FROM Building b WHERE b.type = :type")
    fun findBuildingsByType(@Param("type") type: String): List<Building>
}
