package com.example.propertymanagement.dto

import jakarta.persistence.Id
import java.util.UUID

// @Entity
data class ContractorCorporateDto(
    @Id
    val id: UUID,
    val contractorUuid: UUID,
    val bodyCorporatUuid: UUID,
)
