package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.Date
import java.util.UUID

@Entity
@Table(name = "trustee_bodycoporate_invite")
data class TrusteeBodyCorporateInvite(
    @Id
    @Column(name = "invite_uuid", columnDefinition = "uuid")
    val inviteUuid: UUID = UUID.randomUUID(),
    @Column(name = "trustee_uuid", nullable = false, columnDefinition = "uuid")
    val trusteeUuid: UUID,
    @Column(name = "coporate_uuid", nullable = false, columnDefinition = "uuid")
    val coporateUuid: UUID,
    @Column(nullable = false)
    val status: String = "PENDING", // Options: PENDING, ACCEPTED, REJECTED
    @Column(name = "invited_on")
    val invitedOn: Date = Date(),
)
