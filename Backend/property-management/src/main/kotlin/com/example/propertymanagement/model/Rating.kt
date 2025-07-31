package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "contractor_rating")
data class Rating(
    @Id
    @Column(name = "uuid", unique = true, nullable = false)
    val uuid: UUID = UUID.randomUUID(),
    @Column(name = "contractor_uud")
    val contractorUuid: UUID? = null,
    val comment: String? = null,
    val rating: Int? = null,
    @Column(name = "task_uuid")
    val taskUuid: UUID? = null,
    @Column(name = "trustee_uuid")
    val trusteeUuid: UUID? = null,
)
