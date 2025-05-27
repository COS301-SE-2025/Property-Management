package com.example.propertymanagement.service

import com.example.propertymanagement.model.Quote
import com.example.propertymanagement.repository.QuoteRepository
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.util.Date

@Service
class QuoteService(private val repository: QuoteRepository) {
    fun getAll(): List<Quote> = repository.findAll()

    fun getById(id: Int): Quote = repository.findById(id).orElseThrow { NoSuchElementException("Item not found: $id") }

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
        id: Int,
        newItem: Quote,
    ): Quote {
        val existing = getById(id)
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

    fun delete(id: Int) = repository.deleteById(id)
}
