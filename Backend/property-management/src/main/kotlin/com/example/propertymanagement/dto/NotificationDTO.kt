package com.example.propertymanagement.dto

import java.time.LocalDateTime
import java.util.UUID

data class NotificationDTO(
    val notificationUuid: UUID,
    val createdAt: LocalDateTime,
    val notificationType: String,
    val message: String,
    val recipientType: String,
    val recipientUuid: UUID,
    val isRead: Boolean,
    val relatedTaskUuid: UUID? = null,
    val relatedQuoteUuid: UUID? = null,
    val relatedSessionUuid: UUID? = null,
    val relatedInviteUuid: UUID? = null,
)
