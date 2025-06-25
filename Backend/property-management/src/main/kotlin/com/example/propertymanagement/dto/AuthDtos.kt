package com.example.propertymanagement.dto

data class RegisterRequest(
    val email: String,
    val password: String,
    val contactNumber: String,
)

data class ConfirmRegistrationRequest(
    val username: String,
    val code: String,
)

data class LoginRequest(
    val email: String,
    val password: String,
)

data class LoginResponse(
    val idToken: String,
    val accessToken: String,
    val refreshToken: String,
    val userType: String,
    val userId: String,
)
