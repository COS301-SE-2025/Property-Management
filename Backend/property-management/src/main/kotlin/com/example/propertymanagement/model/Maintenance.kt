package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.Date
import java.util.UUID

@Entity
@Table(name = "maintenancetask")
data class Maintenance(
    @Id
    @GeneratedValue
    @Column(name = "task_uuid")
    val uuid: UUID? = null,
    val title: String,
    @Column(name = "description")
    val des: String,
    val status: String,
    var scheduled_date: java.sql.Date? = null,
    val approved: Boolean,
    @Column(name = "building_uuid")
    val b_uuid: UUID,
    @Column(name = "image_uuid")
    val img: UUID,
    @Column(name = "trustee_uuid")
    val t_uuid: UUID,
)
