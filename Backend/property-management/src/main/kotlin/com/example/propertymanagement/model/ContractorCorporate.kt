package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "contractor_corporate")
data class ContractorCorporate(
    @Id
    val id: UUID = UUID.randomUUID(),
    @Column(name = "contractor_uuid")
    val contractorUuid: UUID,
    @Column(name = "body_corporate_uuid")
    val bodyCorporateUuid: UUID,
)
