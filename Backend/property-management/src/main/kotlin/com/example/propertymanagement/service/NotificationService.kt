package com.example.propertymanagement.service

import com.example.propertymanagement.dto.NotificationDTO
import com.example.propertymanagement.exception.RestException
import com.example.propertymanagement.model.Notification
import com.example.propertymanagement.repository.BodyCorporateRepository
import com.example.propertymanagement.repository.ContractorRepository
import com.example.propertymanagement.repository.NotificationRepository
import com.example.propertymanagement.repository.QuoteRepository
import com.example.propertymanagement.repository.QuoteVoteSessionRepository
import com.example.propertymanagement.repository.TrusteeBodyCorporateInviteRepository
import com.example.propertymanagement.repository.TrusteeRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class NotificationService(
    private val notificationRepo: NotificationRepository,
    private val inviteRepo: TrusteeBodyCorporateInviteRepository,
    private val quoteRepo: QuoteRepository,
    private val sessionRepo: QuoteVoteSessionRepository,
    private val trusteeRepo: TrusteeRepository,
    private val contractorRepo: ContractorRepository,
    private val bodyCorporateRepo: BodyCorporateRepository,
) {
    fun createNotification(
        recipientType: String,
        recipientUuid: UUID,
        notificationType: String,
        message: String,
        relatedTaskUuid: UUID? = null,
        relatedQuoteUuid: UUID? = null,
        relatedSessionUuid: UUID? = null,
        relatedInviteUuid: UUID? = null,
    ): NotificationDTO {
        if (recipientType !in listOf("trustee", "contractor", "bodycorporate")) {
            throw RestException(HttpStatus.BAD_REQUEST, "Invalid recipient type")
        }

        // are they a user
        when (recipientType) {
            "trustee" ->
                if (!trusteeRepo.existsById(recipientUuid)) {
                    throw RestException(HttpStatus.NOT_FOUND, "Trustee not found")
                }
            "contractor" ->
                if (!contractorRepo.existsById(recipientUuid)) {
                    throw RestException(HttpStatus.NOT_FOUND, "Contractor not found")
                }
            "bodycoporate" ->
                if (!bodyCorporateRepo.existsById(recipientUuid)) {
                    throw RestException(HttpStatus.NOT_FOUND, "Body corporate not found")
                }
        }

        val notification =
            Notification(
                notificationUuid = UUID.randomUUID(),
                createdAt = LocalDateTime.now(),
                notificationType = notificationType,
                message = message,
                recipientType = recipientType,
                recipientUuid = recipientUuid,
                isRead = false,
                relatedTaskUuid = relatedTaskUuid,
                relatedQuoteUuid = relatedQuoteUuid,
                relatedSessionUuid = relatedSessionUuid,
                relatedInviteUuid = relatedInviteUuid,
            )
        return notificationRepo.save(notification).let {
            NotificationDTO(
                notificationUuid = it.notificationUuid,
                createdAt = it.createdAt,
                notificationType = it.notificationType,
                message = it.message,
                recipientType = it.recipientType,
                recipientUuid = it.recipientUuid,
                isRead = it.isRead,
                relatedTaskUuid = it.relatedTaskUuid,
                relatedQuoteUuid = it.relatedQuoteUuid,
                relatedSessionUuid = it.relatedSessionUuid,
                relatedInviteUuid = it.relatedInviteUuid,
            )
        }
    }

    fun getNotifications(
        recipientType: String,
        recipientUuid: UUID,
    ): List<NotificationDTO> =
        notificationRepo.findByRecipientTypeAndRecipientUuid(recipientType, recipientUuid).map {
            NotificationDTO(
                notificationUuid = it.notificationUuid,
                createdAt = it.createdAt,
                notificationType = it.notificationType,
                message = it.message,
                recipientType = it.recipientType,
                recipientUuid = it.recipientUuid,
                isRead = it.isRead,
                relatedTaskUuid = it.relatedTaskUuid,
                relatedQuoteUuid = it.relatedQuoteUuid,
                relatedSessionUuid = it.relatedSessionUuid,
                relatedInviteUuid = it.relatedInviteUuid,
            )
        }

    fun markAsRead(notificationUuid: UUID) {
        val notification =
            notificationRepo
                .findById(notificationUuid)
                .orElseThrow { RestException(HttpStatus.NOT_FOUND, "Notification not found") }
        notificationRepo.save(notification.copy(isRead = true))
    }
}
