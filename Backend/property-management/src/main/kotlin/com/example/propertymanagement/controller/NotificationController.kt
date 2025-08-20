package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.NotificationCreateRequest
import com.example.propertymanagement.dto.NotificationDTO
import com.example.propertymanagement.service.NotificationService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/notifications")
class NotificationController(
    private val notificationService: NotificationService,
) {
    @PostMapping
    fun createNotification(
        @RequestBody request: NotificationCreateRequest,
    ): NotificationDTO =
        notificationService.createNotification(
            request.recipientType,
            request.recipientUuid,
            request.notificationType,
            request.message,
            request.relatedTaskUuid,
            request.relatedQuoteUuid,
            request.relatedSessionUuid,
            request.relatedInviteUuid,
        )

    @GetMapping
    fun getNotifications(
        @RequestParam recipientType: String,
        @RequestParam recipientUuid: UUID,
    ): List<NotificationDTO> = notificationService.getNotifications(recipientType, recipientUuid)

    @PutMapping("/{notificationUuid}/read")
    fun markAsRead(
        @PathVariable notificationUuid: UUID,
    ) = notificationService.markAsRead(notificationUuid)
}
