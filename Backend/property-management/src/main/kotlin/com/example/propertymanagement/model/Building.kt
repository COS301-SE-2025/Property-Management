package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Lob
import jakarta.persistence.Table
import java.time.LocalDate

@Entity
@Table(name = "building")
data class Building(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_id")
    val buildingId: Int = 0,

    val name: String?,
    val address: String?,
    val type: String? = null,

    @Column(columnDefinition = "integer[]")
    val trustees: List<Int>? = null,

    @Column(name = "property_value")
    val propertyValue: Double? = null,

    @Column(name = "primary_contractors", columnDefinition = "integer[]")
    val primaryContractors: List<Int>? = null,

    val latestInspectionDate: LocalDate? = null,

   @Column(name = "property_image")
    var propertyImage: String?,
)
