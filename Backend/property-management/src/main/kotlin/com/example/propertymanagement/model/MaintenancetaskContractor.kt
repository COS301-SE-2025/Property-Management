package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.IdClass
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "maintenancetask_contractor")
@IdClass(MaintenancetaskContractorId::class)
data class MaintenancetaskContractor(
    @Id
    @Column(name = "task_uuid")
    val taskUuid: UUID,
    @Id
    @Column(name = "contractor_uuid")
    val contractorUuid: UUID,
    @Column(name = "quote_submitted")
    val quoteSubmitted: Boolean = false,
    @Column(name = "quote_uuid")
    val quoteUuid: UUID? = null,
)

data class MaintenancetaskContractorId(
    val taskUuid: UUID? = null,
    val contractorUuid: UUID? = null,
) : java.io.Serializable
