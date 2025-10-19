package com.example.propertymanagement.repository

import com.example.propertymanagement.model.PDFMeta
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import java.util.Optional
import java.util.UUID

interface PDFRepository : JpaRepository<PDFMeta, UUID> {
    @Query("SELECT p FROM PDFMeta p WHERE p.cUuid = :cUuid")
    fun findAllByCUuid(
        @Param("cUuid") cUuid: UUID,
    ): List<PDFMeta>

    @Query("SELECT p FROM PDFMeta p WHERE p.cUuid = :cUuid AND p.taskUuid = :taskUuid")
    fun findByCUuidAndTaskUuid(
        @Param("cUuid") cUuid: UUID,
        @Param("taskUuid") taskUuid: UUID,
    ): Optional<PDFMeta>

    // Find all by cUuid and type (returns list to handle duplicates)
    fun findAllByCUuidAndType(
        cUuid: UUID,
        type: String,
    ): List<PDFMeta>

    // Delete all by cUuid and type
    @Modifying
    @Transactional
    fun deleteByCUuidAndType(
        cUuid: UUID,
        type: String,
    ): Int
}
