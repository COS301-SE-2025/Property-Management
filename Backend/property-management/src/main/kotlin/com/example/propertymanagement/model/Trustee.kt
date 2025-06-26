package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "trustee")
data class Trustee(
    @Id
    @Column(name = "trustee_uuid", unique = true, nullable = false)
    val trusteeUuid: UUID = UUID.randomUUID(),
    @Column(nullable = false)
    val name: String,
    @Column(nullable = false, unique = true)
    val email: String,
    @Column(nullable = false)
    val phone: String,
    @Column(nullable = false, unique = true)
    val apikey: String,
)
