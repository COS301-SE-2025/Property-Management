package com.example.propertymanagement.repository

import com.example.propertymanagement.model.MaintenancetaskContractor
import com.example.propertymanagement.model.MaintenancetaskContractorId
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface MaintenancetaskContractorRepository : JpaRepository<MaintenancetaskContractor, MaintenancetaskContractorId> {
    fun findByTaskUuid(taskUuid: UUID): List<MaintenancetaskContractor>

    fun existsByTaskUuidAndContractorUuid(
        taskUuid: UUID,
        contractorUuid: UUID,
    ): Boolean

    fun findByTaskUuidAndQuoteSubmitted(
        taskUuid: UUID,
        quoteSubmitted: Boolean,
    ): List<MaintenancetaskContractor>

    fun findByContractorUuid(contractorUuid: UUID): List<MaintenancetaskContractor>
}
