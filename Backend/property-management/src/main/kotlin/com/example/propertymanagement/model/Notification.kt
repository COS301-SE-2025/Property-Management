package com.example.propertymanagement.model

import java.time.LocalDateTime
import java.util.UUID
import jakarta.persistence.Column
import jakarta.persistence.Table
import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
@Table(name = "notification")
data class Notification (
    @Id
    @Column(name = "notification_uuid", unique = true)
    val notificationUuid: UUID = UUID.randomUUID(),
    @Column(name = "created_at")
    val createdAt: LocalDateTime,
    @Column(name = "notification_type")
    val notificationType: String,
    @Column(name = "message" )
    val message: String,
    @Column(name = "recipient_type")
    val recipientType: String,
    @Column(name = "recipient_uuid")
    val recipientUuid: UUID,
    @Column(name = "is_read")
    val isRead: Boolean,
    @Column(name = "related_task_uuid")
    val relatedTaskUuid: UUID? = null,
    @Column(name = "related_quote_uuid")
    val relatedQuoteUuid: UUID? = null,
    @Column(name = "related_session_uuid")
    val relatedSessionUuid: UUID? = null,
    @Column(name = "related_invite_uuid")
    val relatedInviteUuid: UUID? = null,
)
