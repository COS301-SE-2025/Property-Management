package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
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
    val name: String,
    val contact_info: String,
    val status: Boolean,
    val apikey: String,
    val email: String,
    val phone: String,
    val address: String,
    val city: String,
    val postal_code: String,
    val reg_number: String,
    val description: String,
    val services: String,
)
