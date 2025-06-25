package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.math.BigDecimal
import java.util.UUID

@Entity
@Table(name = "bodycoporate")
data class BodyCorporate(
    @Id
    @Column(name = "coporate_uuid")
    val corporateUuid: UUID = UUID.randomUUID(),
    @Column(name = "copname", nullable = false)
    val corporateName: String,
    @Column(name = "contribution_per_sqm", nullable = false, precision = 12, scale = 2)
    val contributionPerSqm: BigDecimal,
    @Column(name = "total_budget", precision = 14, scale = 2)
    val totalBudget: BigDecimal = BigDecimal.ZERO,
    @Column(name = "email", length = 255)
    val email: String? = null,
    @Column(name = "user_id", length = 64)
    val userId: String? = null,
    @Column(name = "username", length = 255)
    val username: String? = null,
)
