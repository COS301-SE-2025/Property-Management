package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Trustee
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional
import java.util.UUID


interface TrusteeRepository : JpaRepository<Trustee, Int>{
    fun findByUuid(uuid: UUID): Optional<Trustee>

    fun deleteByUuid(uuid: UUID)
}
