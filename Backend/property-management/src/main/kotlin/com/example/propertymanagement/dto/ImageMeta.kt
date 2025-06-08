package com.example.propertymanagement.dto

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
data class ImageMeta(
    @Id
    val id: String,
    val filename: String,
    val url: String
)
