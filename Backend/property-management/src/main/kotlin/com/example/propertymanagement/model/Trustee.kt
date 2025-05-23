package com.example.propertymanagement.model

import jakarta.persistence.*

@Entity
@Table(name = "trustee")
data class Trustee(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trustee_id")
    val trustee_id: Int = 0,
    val name: String,
    val email: String,
    val phone: String,
    val apikey: String
)

