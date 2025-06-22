package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Budget
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.UUID

@Repository
interface BudgetRepository : JpaRepository<Budget, UUID> {
    
    @Query("SELECT b FROM Budget b WHERE b.buildingUuid = :buildingUuid")
    fun findByBuildingUuid(@Param("buildingUuid") buildingUuid: UUID): List<Budget>
    
    @Query("SELECT b FROM Budget b WHERE b.year = :year")
    fun findByYear(@Param("year") year: Int): List<Budget>
    
    @Query("SELECT b FROM Budget b WHERE b.buildingUuid = :buildingUuid AND b.year = :year")
    fun findByBuildingUuidAndYear(
        @Param("buildingUuid") buildingUuid: UUID,
        @Param("year") year: Int
    ): Budget?
}
