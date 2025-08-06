package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Rating
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.Optional
import java.util.UUID

interface RatingRepository : JpaRepository<Rating, UUID> {
    fun findByTrusteeUuid(trusteeUuid: UUID): Optional<Rating>

    fun findByUuid(uuid: UUID): Optional<Rating>

    fun findByContractorUuid(contractorUuid: UUID): Optional<Rating>

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.contractorUuid =:contractorUuid")
    fun averageContractorRating(
        @Param("contractorUuid") contractorUuid: UUID,
    ): Double?
}
