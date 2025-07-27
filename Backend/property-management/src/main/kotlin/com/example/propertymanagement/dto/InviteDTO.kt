package com.example.propertymanagement.dto

import java.util.Date
import java.util.UUID

data class InviteDTO(
    val inviteUuid: UUID? = null,
    val trusteeUuid: UUID,
    val coporateUuid: UUID,
    val status: String? = null,
    val invitedOn: Date? = null,
)
