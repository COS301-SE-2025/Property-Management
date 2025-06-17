package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Building
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface BuildingRepository : JpaRepository<Building, Int> {
    // @Query(
    //     value = "SELECT * FROM building WHERE :trusteeId = ANY(trustees)",
    //     nativeQuery = true,
    // )
    // fun findByTrusteeId(trusteeId: Int): List<Building>
    fun findByBuildingUuid(buildingUuid: UUID): Building?

    @Query(
        """
        Select b.* FROM building b
        JOIN buildingtrustee bt ON b.building_uuid = bt.building_uuid
        WHERE bt.trustee_uuid = :trusteeUuid
    """,
        nativeQuery = true,
    )
    fun findByTrusteeUuid(trusteeUuid: UUID): List<Building>
}
