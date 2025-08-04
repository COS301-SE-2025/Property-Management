package com.example.propertymanagement.dto

import java.util.UUID
import java.math.BigDecimal
import java.util.Date

data class PartialQuoteUpdateDTO(
    val amount: BigDecimal? = null,
    val status: String? = null,
    val doc: String? = null,
    val t_uuid: UUID? = null,
    val c_uuid: UUID? = null
)

data class QuoteDto(
    val amount: BigDecimal,
    val submitted_on: Date,
    val status: String,
    val t_uuid: UUID,
    val c_uuid: UUID,
    val doc: String,
)