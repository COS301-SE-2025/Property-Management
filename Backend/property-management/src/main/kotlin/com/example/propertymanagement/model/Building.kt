package com.example.propertymanagement.model

import jakarta.persistence.*

@Entity
@Table(name = "building")
data class Building(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_id")
    val buildingId: Int = 0,

    val name: String?,
    val address: String?
)