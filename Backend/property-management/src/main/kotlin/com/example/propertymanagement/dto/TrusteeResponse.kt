package com.example.propertymanagement.dto

data class TrusteeResponse(
    val trustee_id: Int,
    val name: String,
    val email: String,
    val phone: String,
    val apikey: String
)
