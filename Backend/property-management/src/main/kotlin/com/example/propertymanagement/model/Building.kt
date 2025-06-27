package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDate
import java.util.UUID
import com.vladmihalcea.hibernate.type.array.StringArrayType
import org.hibernate.annotations.Type

@Entity
@Table(name = "building")
data class Building(
    @Id
    @Column(name = "building_uuid", unique = true)
    val buildingUuid: UUID = UUID.randomUUID(),
    @Column(name = "name")
    val name: String? = null,
    @Column(name = "address")
    val address: String? = null,
    @Column(name = "type")
    val type: String? = null,
    @Column(name = "property_value")
    val propertyValue: Double? = null,
    @Type(StringArrayType::class)
    @Column(name = "primary_contractors", columnDefinition = "text[]")
    val primaryContractors: Array<String>? = null,
    @Column(name = "latest_inspection_date")
    val latestInspectionDate: LocalDate? = null,
    @Column(name = "property_image")
    val propertyImage: String? = null,
    @Column(name = "trustee_uuid")
    val trusteeUuid: UUID? = null,
    @Column(name = "area")
    val area: Double,
    @Column(name = "coporate_uuid")
    val coporateUuid: UUID? = null,
)
