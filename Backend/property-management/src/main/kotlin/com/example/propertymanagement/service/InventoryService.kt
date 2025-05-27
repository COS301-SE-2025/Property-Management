package com.example.propertymanagement.service

import com.example.propertymanagement.dto.InventoryItemRequest
import com.example.propertymanagement.dto.InventoryUsageRequest
import com.example.propertymanagement.model.InventoryItem
import com.example.propertymanagement.repository.InventoryItemRepository
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class InventoryService(
    private val repository: InventoryItemRepository,
    private val jdbcTemplate: JdbcTemplate,
) {
    fun getAll(): List<InventoryItem> = repository.findAll()

    fun getById(id: Long): InventoryItem = repository.findById(id).orElseThrow { NoSuchElementException("Item not found: $id") }

    fun add(item: InventoryItem): InventoryItem = repository.save(item)

    fun update(
        id: Long,
        newItem: InventoryItem,
    ): InventoryItem {
        val existing = getById(id)

        if (newItem.quantityInStock < 0) {
        throw IllegalArgumentException("Quantity in stock cannot be negative")
        }
 
        val updated =
            existing.copy(
                name = newItem.name,
                unit = newItem.unit,
                quantityInStock = newItem.quantityInStock,
                buildingId = newItem.buildingId,
            )
        return repository.save(updated)
    }


  @Transactional
    fun addOrUpdateItem(request: InventoryItemRequest) {
        if (request.quantity < 0) {
            throw IllegalArgumentException("Quantity cannot be negative")
        }

        val totalCost = request.quantity * request.price

        jdbcTemplate.update(
            "UPDATE budget SET inventory_spent = COALESCE(inventory_spent, 0) + ? WHERE building_id = ?",
            totalCost,
            request.building_id,
        )

        val existing = repository.findAll().find { it.name == request.name && it.buildingId == request.building_id }
        if (existing != null) {
            // Increment quantity_in_stock
            jdbcTemplate.update(
                "UPDATE inventoryitem SET quantity_in_stock = quantity_in_stock + ? WHERE item_id = ?",
                request.quantity,
                existing.itemId,
            )
        } else {
            // Insert new item
            val newItem =
                InventoryItem(
                    name = request.name,
                    unit = "unit",
                    quantityInStock = request.quantity,
                    buildingId = request.building_id,
                )
            repository.save(newItem)
        }
    }


    fun useInventoryItem(request: InventoryUsageRequest): InventoryItem {
        if (request.unit <= 0) {
            throw IllegalArgumentException("Quantity must be greater than zero")
        }

        val item = repository.findAll().find { 
            it.buildingId == request.id && it.name.equals(request.name, ignoreCase = true)
        } ?: throw NoSuchElementException("Item ${request.name} not found in building with ID ${request.id}")

        if (item.quantityInStock < request.unit) {
            throw IllegalArgumentException("Not enough stock for item ${request.name} in building with ID ${request.id}")
        }

        val updatedItem = item.copy(
            quantityInStock = item.quantityInStock - request.unit
        )

        return repository.save(updatedItem)
         
    }

    fun delete(id: Long) {
        if (!repository.existsById(id)) {
            throw NoSuchElementException("Item with ID $id not found")
        }
        repository.deleteById(id)
    }

}
