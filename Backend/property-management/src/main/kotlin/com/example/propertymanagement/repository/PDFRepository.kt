package com.example.propertymanagement.repository

import com.example.propertymanagement.model.PDFMeta
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.Optional
import java.util.UUID


interface PDFRepository : JpaRepository<PDFMeta, String>{

    @Query("SELECT p FROM pdf_meta p WHERE p.contractor_uuid = :cUuid")
    fun findAllByContractorUuid(
        @Param("cUuid") cUuid: UUID,
    ): List<PDFMeta>
}
