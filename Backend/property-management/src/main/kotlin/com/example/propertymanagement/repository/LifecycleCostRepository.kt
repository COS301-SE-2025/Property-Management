package com.example.propertymanagement.repository

import com.example.propertymanagement.model.LifecycleCost
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface LifecycleCostRepository : JpaRepository<LifecycleCost, UUID> {
    fun findByCoporateUuid(coporateUuid: UUID): List<LifecycleCost>
}
