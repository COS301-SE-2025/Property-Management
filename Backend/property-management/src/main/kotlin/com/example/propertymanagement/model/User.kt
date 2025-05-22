package com.example.propertymanagement.model

import jakarta.persistence.*

@Entity
@Table(name = "\"User\"")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    val itemId: Int = 0,

    val name: String,
    val email: String,
    val phone: String,
    val cognito_id: String
)

