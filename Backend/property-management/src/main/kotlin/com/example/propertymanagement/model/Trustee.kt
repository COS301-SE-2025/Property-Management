package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "trustee")
data class Trustee(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trustee_id")
    val id: Int? = null,
    val name: String,
    @Column(nullable = false, unique = true)
    val email: String,
    @Column(nullable = false)
    val phone: String,
    @Column(nullable = false, unique = true)
    val apikey: String,
    @Column(name = "trustee_uuid")
    val uuid: UUID = UUID.randomUUID()
)
