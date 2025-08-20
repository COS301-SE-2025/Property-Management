package com.example.propertymanagement.repository

import com.example.propertymanagement.model.TaskProgress
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface TaskProgressRepository : JpaRepository<TaskProgress, UUID> {
    fun findByTaskUuid(taskUuid: UUID): List<TaskProgress>

    fun findByContractorUuid(contractorUuid: UUID): List<TaskProgress>
}
