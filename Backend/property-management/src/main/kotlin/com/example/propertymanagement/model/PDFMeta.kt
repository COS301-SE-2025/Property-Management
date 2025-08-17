package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "pdf_meta")
data class PDFMeta(
    @Id
    val id: String,
    val filename: String,
    val key: String,
    val url: String,
    @Column(name = "contractor_uuid")
    val cUuid: UUID,
)
