package com.example.propertymanagement.repository

import com.example.propertymanagement.model.PDFMeta
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
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

    fun findByCUuidAndType(cUuid: UUID, type: String): Optional<PDFMeta>

    fun deleteByCUuidAndType(cUuid: UUID, type: String)
}

