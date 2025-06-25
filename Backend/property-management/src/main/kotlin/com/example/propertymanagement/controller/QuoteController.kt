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
import java.util.NoSuchElementException
import java.util.UUID

@RestController
@RequestMapping("/api/quote")
class QuoteController(
    private val service: QuoteService,
) {
    @GetMapping
    fun getAll(): List<Quote> = service.getAll()

    @GetMapping("/{uuid}")
    fun getById(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Quote> {
        val quote = service.getById(uuid)
        return if (quote != null) ResponseEntity.ok(quote) else ResponseEntity.notFound().build()
    }

    data class QuoteDto(
        val amount: BigDecimal,
        val submitted_on: Date,
        val status: String,
        val t_uuid: UUID,
        val c_uuid: UUID,
        val doc: String
    )

    @PostMapping
    fun createQuote(
        @RequestBody quoteDto: QuoteDto,
    ): Quote = service.addQuote(
        quoteDto.t_uuid,
        quoteDto.c_uuid, 
        quoteDto.submitted_on, 
        quoteDto.status, 
        quoteDto.amount, 
        quoteDto.doc)

    @PutMapping("/{uuid}")
    fun update(
        @PathVariable uuid: UUID,
        @RequestBody item: Quote,
    ): Quote = service.update(uuid, item)

    @DeleteMapping("/{uuid}")
    fun delete(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Void> {
        service.delete(uuid)
        return ResponseEntity.noContent().build()
    }
}
