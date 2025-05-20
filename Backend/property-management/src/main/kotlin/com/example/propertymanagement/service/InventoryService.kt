package com.example.propertymanagement.service

import com.example.propertymanagement.model.InventoryItem
import com.example.propertymanagement.repository.InventoryItemRepository
import org.springframework.stereotype.Service

@Service
class InventoryService(private val repository: InventoryItemRepository) {

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
}
