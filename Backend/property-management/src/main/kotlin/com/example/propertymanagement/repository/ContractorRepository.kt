package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Contractor
import org.springframework.data.jpa.repository.JpaRepository

interface ContractorRepository : JpaRepository<Contractor, Int>
