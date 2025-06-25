package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Quote
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional
import java.util.UUID

interface QuoteRepository : JpaRepository<Quote, Int> {
    fun findByUuid(uuid: UUID): Optional<Quote>

    fun deleteByUuid(uuid: UUID)
}
