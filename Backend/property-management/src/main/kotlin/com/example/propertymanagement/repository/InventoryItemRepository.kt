package com.example.propertymanagement.repository

import com.example.propertymanagement.model.InventoryItem
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface InventoryItemRepository : CrudRepository<InventoryItem, Int> {
    
    @Query("SELECT i FROM InventoryItem i WHERE i.buildingUuidFk = :buildingUuid")
    fun findByBuildingUuid(@Param("buildingUuid") buildingUuid: UUID): Iterable<InventoryItem>
    
    @Query("SELECT i FROM InventoryItem i WHERE i.itemUuid = :itemUuid")
    fun findByItemUuid(@Param("itemUuid") itemUuid: UUID): InventoryItem?
    
    @Query("SELECT i FROM InventoryItem i")
    override fun findAll(): Iterable<InventoryItem>
}