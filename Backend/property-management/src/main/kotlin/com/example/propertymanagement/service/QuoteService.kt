package com.example.propertymanagement.service

import com.example.propertymanagement.model.Quote
import com.example.propertymanagement.repository.QuoteRepository
import org.springframework.stereotype.Service
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
        task_id: Int,
        contractor_id: Int,
        amount: BigDecimal,
        submitted_on: Date,
        type: String,
    ): Quote {
        val newQuote = Quote(task_id = task_id, contractor_id = contractor_id, submitted_on = submitted_on, type = type, amount = amount)
        return add(newQuote)
    }

    fun update(
        uuid: UUID,
        newItem: Quote,
    ): Quote {
        val existing = getById(uuid)
        val updated =
            existing.copy(
                task_id = newItem.task_id,
                contractor_id = newItem.contractor_id,
                amount = newItem.amount,
                submitted_on = newItem.submitted_on,
                type = newItem.type,
            )
        return repository.save(updated)
    }

    fun delete(uuid: UUID) = repository.deleteByUuid(uuid)
}
