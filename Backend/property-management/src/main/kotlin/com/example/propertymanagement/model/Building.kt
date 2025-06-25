package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDate
import java.util.UUID

@Entity
@Table(name = "building")
data class Building(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_uuid", unique = true)
    val buildingUuid: UUID = UUID.randomUUID(),
    val name: String?,
    val address: String?,
    val type: String? = null,
    @Column(name = "property_value")
    val propertyValue: Double? = null,
    @Column(name = "primary_contractors", columnDefinition = "integer[]")
    val primaryContractors: List<Int>? = null,
    val latestInspectionDate: LocalDate? = null,
    @Column(name = "property_image")
    var propertyImage: String?,
)
