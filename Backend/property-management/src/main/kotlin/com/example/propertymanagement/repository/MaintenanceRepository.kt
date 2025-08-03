package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Maintenance
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.Optional
import java.util.UUID

interface MaintenanceRepository : JpaRepository<Maintenance, UUID> {
    fun findByUuid(uuid: UUID): Optional<Maintenance>

    fun deleteByUuid(uuid: UUID)

    @Query("SELECT m FROM Maintenance m WHERE m.tUuid = :trusteeUuid")
    fun findAllBytUuid(
        @Param("trusteeUuid") trusteeUuid: UUID,
    ): List<Maintenance>

    @Query("SELECT m FROM Maintenance m WHERE m.bUuid IN (SELECT b.buildingUuid FROM Building b WHERE b.coporateUuid = :coporateUuid)")
    fun findByCorporateUuid(
        @Param("coporateUuid") coporateUuid: UUID,
    ): List<Maintenance>
}
