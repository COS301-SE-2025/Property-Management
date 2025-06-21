package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Quote
import com.example.propertymanagement.service.QuoteService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal
import java.util.Date

@RestController
@RequestMapping("/api/quote")
class QuoteController(
    private val service: QuoteService,
) {
    @GetMapping
    fun getAll(): List<Quote> = service.getAll()

    @GetMapping("/{id}")
    fun getById(
        @PathVariable id: Int,
    ): ResponseEntity<Quote> =
        try {
            val item = service.getById(id)
            ResponseEntity.ok(item)
        } catch (ex: NoSuchElementException) {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(mapOf("error" to ex.message))
        }

    data class QuoteDto(
        val task_id: Int,
        val contractor_id: Int,
        val amount: BigDecimal,
        val submitted_on: Date,
        val type: String,
    )

    @PostMapping
    fun createQuote(
        @RequestBody QuoteDto: QuoteDto,
    ): Quote = service.addQuote(QuoteDto.task_id, QuoteDto.contractor_id, QuoteDto.amount, QuoteDto.submitted_on, QuoteDto.type)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Int,
        @RequestBody item: Quote,
    ): Quote = service.update(id, item)

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable id: Int,
    ): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }
}
