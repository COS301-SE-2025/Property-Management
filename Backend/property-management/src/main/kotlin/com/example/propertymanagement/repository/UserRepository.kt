package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Trustee
import org.springframework.data.jpa.repository.JpaRepository

interface TrusteeRepository : JpaRepository<Trustee, Long>
