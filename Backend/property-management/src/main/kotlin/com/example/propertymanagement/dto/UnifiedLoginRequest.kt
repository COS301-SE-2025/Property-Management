package com.example.propertymanagement.dto

data class UnifiedLoginRequest(
    val email: String,
    val password: String,
    val role: String? = null,
)
