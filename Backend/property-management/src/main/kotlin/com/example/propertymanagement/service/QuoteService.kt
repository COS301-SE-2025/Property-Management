package com.example.propertymanagement.service

import com.example.propertymanagement.model.Quote
import com.example.propertymanagement.repository.QuoteRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.util.Date
import java.util.NoSuchElementException
import java.util.UUID

@Service
class QuoteService(
    private val repository: QuoteRepository,
) {
    fun getAll(): List<Quote> = repository.findAll()

    fun getById(uuid: UUID): Quote = repository.findByUuid(uuid).orElseThrow { NoSuchElementException("Contractor not found: $uuid") }

    fun add(item: Quote): Quote = repository.save(item)

    fun addQuote(
        t_uuid: UUID,
        c_uuid: UUID,
        submitted_on: Date,
        status: String,
        amount: BigDecimal,
        doc: String,
    ): Quote {
        val newQuote =
            Quote(
                t_uuid = t_uuid,
                c_uuid = c_uuid,
                submitted_on = submitted_on,
                status = status,
                amount = amount,
                doc = doc,
            )
        return add(newQuote)
    }

    fun update(
        uuid: UUID,
        newItem: Quote,
    ): Quote {
        val existing = getById(uuid)
        val updated =
            existing.copy(
                t_uuid = newItem.t_uuid,
                c_uuid = newItem.c_uuid,
                amount = newItem.amount,
                submitted_on = newItem.submitted_on,
                status = newItem.status,
                doc = newItem.doc,
            )
        return repository.save(updated)
    }

    @Transactional
    fun delete(uuid: UUID) = repository.deleteByUuid(uuid)
}
