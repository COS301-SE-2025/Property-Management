package com.example.propertymanagement.repository

import com.example.propertymanagement.model.BodyCorporate
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.math.BigDecimal
import java.util.UUID

@Repository
interface BodyCorporateRepository : JpaRepository<BodyCorporate, UUID> {
    
    fun findByEmail(email: String): BodyCorporate?
    
    fun findByUserId(userId: String): BodyCorporate?
    
    fun existsByEmail(email: String): Boolean
    
    fun existsByUserId(userId: String): Boolean
    
    @Query("SELECT bc FROM BodyCorporate bc WHERE bc.corporateName ILIKE %:name%")
    fun findByCorporateNameContainingIgnoreCase(@Param("name") name: String): List<BodyCorporate>
    
    @Query("SELECT bc FROM BodyCorporate bc WHERE bc.contributionPerSqm >= :minContribution AND bc.contributionPerSqm <= :maxContribution")
    fun findByContributionPerSqmBetween(
        @Param("minContribution") minContribution: BigDecimal,
        @Param("maxContribution") maxContribution: BigDecimal
    ): List<BodyCorporate>
    
    @Query("SELECT bc FROM BodyCorporate bc WHERE bc.totalBudget >= :minBudget")
    fun findByTotalBudgetGreaterThanEqual(@Param("minBudget") minBudget: BigDecimal): List<BodyCorporate>
    
    @Query("SELECT COUNT(bc) FROM BodyCorporate bc")
    fun countAllBodyCorporates(): Long
    
    @Query("SELECT SUM(bc.totalBudget) FROM BodyCorporate bc")
    fun sumAllTotalBudgets(): BigDecimal?
}