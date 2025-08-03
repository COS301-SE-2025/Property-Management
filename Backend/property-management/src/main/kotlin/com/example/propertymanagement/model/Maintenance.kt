package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.Date
import java.util.UUID

@Entity
@Table(name = "maintenancetask")
data class Maintenance(
    @Id
    @Column(name = "task_uuid", updatable = false, nullable = false)
    val uuid: UUID = UUID.randomUUID(),
    val title: String,
    @Column(name = "description")
    val des: String,
    val status: String,
    var scheduled_date: java.sql.Date? = null,
    val approved: Boolean,
    @Column(name = "building_uuid")
    val bUuid: UUID,
    @Column(name = "created_by_uuid")
    val createdByUuid: UUID,
    @Column(name = "image_uuid")
    val img: UUID,
    @Column(name = "trustee_uuid")
    val tUuid: UUID,
    @Column(name = "contractor_uuid")
    val cUuid: UUID? = null,
    @Column(name = "approval_status")
    val approvalStatus: String = "PENDING",
)
