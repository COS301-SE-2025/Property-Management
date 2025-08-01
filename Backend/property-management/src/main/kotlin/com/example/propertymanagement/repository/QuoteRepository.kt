package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Quote
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.Optional
import java.util.UUID

interface QuoteRepository : JpaRepository<Quote, UUID> {
    fun findByUuid(uuid: UUID): Optional<Quote>

    fun deleteByUuid(uuid: UUID)

    @Query("SELECT q FROM Quote q WHERE q.t_uuid = :taskUuid")
    fun findAllByTaskUuid(
        @Param("taskUuid") taskUuid: UUID,
    ): List<Quote>
}
