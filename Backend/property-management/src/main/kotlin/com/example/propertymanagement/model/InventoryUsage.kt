package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.sql.Date
import java.util.UUID

@Entity
@Table(name = "inventoryusage")
data class InventoryUsage(
    @Id
    @Column(name = "usage_uuid", nullable = false, updatable = false, columnDefinition = "UUID")
    val usageUuid: UUID = UUID.randomUUID(),
    @Column(name = "item_uuid", columnDefinition = "UUID")
    val itemUuid: UUID,
    @Column(name = "task_uuid", columnDefinition = "UUID")
    val taskUuid: UUID,
    @Column(name = "used_by_contractor_uuid", columnDefinition = "UUID")
    val usedByContractorUuid: UUID,
    @Column(name = "quantity_used")
    val quantityUsed: Int,
    @Column(name = "trustee_approved")
    val trusteeApproved: Boolean = false,
    @Column(name = "approval_date")
    val approvalDate: Date? = null,
)
