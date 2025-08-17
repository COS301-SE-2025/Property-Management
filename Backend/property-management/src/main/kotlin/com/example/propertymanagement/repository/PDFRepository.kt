package com.example.propertymanagement.repository

import com.example.propertymanagement.model.PDFMeta
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PDFRepository : JpaRepository<PDFMeta, String>
