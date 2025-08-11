package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.OffsetDateTime
import java.util.UUID

@Entity
@Table(name = "task_progress")
data class TaskProgress(
    @Id
    @Column(name = "progress_uuid", updatable = false, nullable = false)
    val progressUuid: UUID = UUID.randomUUID(),
    @Column(name = "submission_date", nullable = false)
    val submissionDate: OffsetDateTime = OffsetDateTime.now(),
    @Column(name = "contractor_uuid", nullable = false)
    val contractorUuid: UUID,
    @Column(name = "task_uuid", nullable = false)
    val taskUuid: UUID,
    @Column(name = "image_id")
    val imageId: String? = null,
    @Column(name = "progress_percentage")
    val progressPercentage: BigDecimal,
    @Column(name = "work_description", columnDefinition = "TEXT")
    val workDescription: String? = null,
    @Column(name = "inventory_usage_uuid")
    val inventoryUsageUuid: UUID? = null,
    @Column(name = "quantity_used")
    val quantityUsed: Int? = null,
    @Column(name = "remarks", columnDefinition = "TEXT")
    val remarks: String? = null,
    @Column(name = "last_updated")
    val lastUpdated: OffsetDateTime = OffsetDateTime.now(),
)
