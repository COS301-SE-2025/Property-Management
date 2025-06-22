package com.example.propertymanagement.repository

import com.example.propertymanagement.model.InventoryUsage
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.UUID
import java.sql.Date

@Repository
interface InventoryUsageRepository : JpaRepository<InventoryUsage, UUID> {
    
    fun findByItemUuid(itemUuid: UUID): List<InventoryUsage>

    fun findByTaskUuid(taskUuid: UUID): List<InventoryUsage>

    fun findByUsedByContractorUuid(contractorUuid: UUID): List<InventoryUsage>

    fun findByTrusteeApprovedTrue(): List<InventoryUsage>

    fun findByTrusteeApprovedFalse(): List<InventoryUsage>

    fun findByQuantityUsedBetween(minQuantity: Int, maxQuantity: Int): List<InventoryUsage>

    @Query("SELECT COALESCE(SUM(iu.quantityUsed), 0) FROM InventoryUsage iu WHERE iu.itemUuid = :itemUuid")
    fun getTotalQuantityUsedForItem(@Param("itemUuid") itemUuid: UUID): Int

    @Query("SELECT COALESCE(SUM(iu.quantityUsed), 0) FROM InventoryUsage iu WHERE iu.usedByContractorUuid = :contractorUuid")
    fun getTotalQuantityUsedByContractor(@Param("contractorUuid") contractorUuid: UUID): Int
}