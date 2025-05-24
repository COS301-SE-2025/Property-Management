package com.example.propertymanagement.service

import com.example.propertymanagement.dto.InventoryItemRequest
import com.example.propertymanagement.model.InventoryItem
import com.example.propertymanagement.repository.InventoryItemRepository
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class InventoryService(
    private val repository: InventoryItemRepository,
    private val jdbcTemplate: JdbcTemplate // Add this dependency
) {

    fun getAll(): List<InventoryItem> = repository.findAll()

    fun getById(id: Long): InventoryItem =
        repository.findById(id).orElseThrow { NoSuchElementException("Item not found: $id") }

    fun add(item: InventoryItem): InventoryItem = repository.save(item)

    fun update(id: Long, newItem: InventoryItem): InventoryItem {
        val existing = getById(id)
        val updated = existing.copy(
            name = newItem.name,
            unit = newItem.unit,
            quantityInStock = newItem.quantityInStock,
            buildingId = newItem.buildingId
        )
        return repository.save(updated)
    }

    fun delete(id: Long) = repository.deleteById(id)

    // --- New endpoint logic ---
    @Transactional
    fun addOrUpdateItem(request: InventoryItemRequest) {
        val totalCost = request.quantity * request.price

        // Update budget: increment inventory_spent (make sure this column exists)
        jdbcTemplate.update(
            "UPDATE budget SET inventory_spent = COALESCE(inventory_spent, 0) + ? WHERE building_id = ?",
            totalCost, request.building_id
        )

        // Check if item exists for this building
        val existing = repository.findAll().find { it.name == request.name && it.buildingId == request.building_id }
        if (existing != null) {
            // Increment quantity_in_stock
            jdbcTemplate.update(
                "UPDATE inventoryitem SET quantity_in_stock = quantity_in_stock + ? WHERE item_id = ?",
                request.quantity, existing.itemId
            )
        } else {
            // Insert new item (unit is placeholder)
            val newItem = InventoryItem(
                name = request.name,
                unit = "unit", 
                quantityInStock = request.quantity,
                buildingId = request.building_id
            )
            repository.save(newItem)
        }
    }

    
}
