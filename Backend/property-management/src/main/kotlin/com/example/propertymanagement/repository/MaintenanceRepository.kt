package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Maintenance
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional
import java.util.UUID


interface MaintenanceRepository : JpaRepository<Maintenance, Int>{
    fun findByUuid(uuid: UUID): Optional<Maintenance>

    fun deleteByUuid(uuid: UUID)
}
