package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import jakarta.persistence.*


@Entity
@Table(name = "trustee")
data class Trustee(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trustee_id")
    val trustee_id: Long = 0,
    val name: String,
    val email: String,
    val phone: String,
    val apikey: String,
)
