package com.example.propertymanagement.controller

import com.example.propertymanagement.model.InventoryItem
import com.example.propertymanagement.service.InventoryService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/inventory")
class InventoryController(private val service: InventoryService) {

    @GetMapping
    fun getAll(): List<InventoryItem> = service.getAll()

    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): InventoryItem = service.getById(id)

    @PostMapping
    fun add(@RequestBody item: InventoryItem): InventoryItem = service.add(item)

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody item: InventoryItem): InventoryItem =
        service.update(id, item)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }
}
