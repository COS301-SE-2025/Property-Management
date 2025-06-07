package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Building
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface BuildingRepository : JpaRepository<Building, Int> {
    @Query(
        value = "SELECT * FROM building WHERE :trusteeId = ANY(trustees)",
        nativeQuery = true,
    )
    fun findByTrusteeId(trusteeId: Int): List<Building>
}
