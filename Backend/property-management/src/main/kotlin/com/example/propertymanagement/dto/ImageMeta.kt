package com.example.propertymanagement.dto

import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.util.UUID

@Entity
data class ImageMeta(
    @Id
    val id: String,
    val filename: String,
    val url: String,
    val task_uuid: UUID?,
    val user_uuid: UUID,
)
