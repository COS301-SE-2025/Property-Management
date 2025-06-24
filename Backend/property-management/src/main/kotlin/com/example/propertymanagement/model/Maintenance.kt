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
    @Column(name = "task_uuid")
    val uuid: UUID = UUID.randomUUID(),
    val title: String,
    @Column(name = "description")
    val des: String,
    val status: String,
    val scheduled_date: Date,
    val created_by: Int = 0,
    @Column(name = "image_id")
    val img: String,
    val approved: Boolean,
    val building_id: Int = 0,
)
