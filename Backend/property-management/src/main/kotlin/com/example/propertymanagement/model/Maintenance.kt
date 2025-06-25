package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.util.Date
import java.util.UUID

@Entity
@Table(name = "maintenancetask")
data class Maintenance(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val title: String,
    @Column(name = "description")
    val des: String,
    val status: String,
    val scheduled_date: Date,
    val approved: Boolean,
    @Column(name = "task_uuid")
    val uuid: UUID = UUID.randomUUID(),
    @Column(name = "building_uuid")
    val b_uuid: UUID,
    @Column(name = "created_by_uuid")
    val cb_uuid: UUID,
    @Column(name = "image_uuid")
    val img: UUID,
    @Column(name = "trustee_uuid")
    val t_uuid: UUID,
)
