package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Quote
import org.springframework.data.jpa.repository.JpaRepository

interface QuoteRepository : JpaRepository<Quote, Int>
