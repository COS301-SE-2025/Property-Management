package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.NotificationDTO
import com.example.propertymanagement.service.NotificationService
import java.util.UUID
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.PathVariable


@RestController
@RequestMapping("/api/notifications")
class NotificationController(
    private val notificationService: NotificationService
) {
    @PostMapping
    fun createNotification(
        @RequestParam recipientType: String,
        @RequestParam recipientUuid: UUID,
        @RequestParam notificationType: String,
        @RequestParam message: String,
        @RequestParam(required = false) relatedTaskUuid: UUID? = null,
        @RequestParam(required = false) relatedQuoteUuid: UUID? = null,
        @RequestParam(required = false) relatedSessionUuid: UUID? = null,
        @RequestParam(required = false) relatedInviteUuid: UUID? = null
    ): NotificationDTO = notificationService.createNotification(
        recipientType, recipientUuid, notificationType, message, relatedTaskUuid, relatedQuoteUuid, relatedSessionUuid, relatedInviteUuid
    )

    @GetMapping
    fun getNotifications(
        @RequestParam recipientType: String,
        @RequestParam recipientUuid: UUID
    ): List<NotificationDTO> =
        notificationService.getNotifications(recipientType, recipientUuid)

    @PutMapping("/{notificationUuid}/read")
    fun markAsRead(@PathVariable notificationUuid: UUID) = notificationService.markAsRead(notificationUuid)
}