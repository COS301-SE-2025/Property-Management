package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "contractor")
data class Contractor(
    @Id
    @GeneratedValue
    @Column(name = "contractor_uuid", unique = true, nullable = false)
    val uuid: UUID? = null,
    val name: String? = null,
    val contact_info: String? = null,
    val status: Boolean? = null,
    val apikey: String? = null,
    val email: String? = null,
    val phone: String? = null,
    val address: String? = null,
    val city: String? = null,
    val postal_code: String? = null,
    val reg_number: String? = null,
    val description: String? = null,
    val services: String? = null,
    val corporate_uuid: UUID? = null,
    @Column(name = "profile_image_uuid")
    val img: UUID? = null,
)
