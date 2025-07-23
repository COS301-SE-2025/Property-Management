package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Notification
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface NotificationRepository : JpaRepository<Notification, UUID> {
    fun findByRecipientTypeAndRecipientUuid(recipientType: String, recipientUuid : UUID): List<Notification>
    fun findByRecipientTypeAndRecipientUuidAndIsRead(recipientType: String , recipientUuid: UUID, isRead: Boolean): List<Notification>
}