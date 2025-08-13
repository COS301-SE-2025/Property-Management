package com.example.propertymanagement.model

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "pdf_meta")
data class PDFMeta(
    @Id
    val id: String,
    val filename: String,
    val key: String,
    val url: String,
)
