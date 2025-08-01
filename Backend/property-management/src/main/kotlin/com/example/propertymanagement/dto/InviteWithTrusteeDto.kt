package com.example.propertymanagement.dto

import java.time.Instant
import java.util.UUID

data class InviteWithTrusteeDto(
    val inviteUuid: UUID,
    val status: String,
    val invitedOn: Instant,
    val trusteeUuid: UUID,
    val name: String,
    val email: String,
    val role: String
)