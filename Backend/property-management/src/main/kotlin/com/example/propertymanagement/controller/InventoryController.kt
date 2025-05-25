package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.InventoryItemRequest
import com.example.propertymanagement.model.InventoryItem
import com.example.propertymanagement.service.InventoryService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/inventory")
class InventoryController(private val service: InventoryService) {
    @GetMapping
    fun getAll(): List<InventoryItem> = service.getAll()

    @PostMapping
    fun addOrUpdate(
        @RequestBody request: InventoryItemRequest,
    ): ResponseEntity<String> {
        service.addOrUpdateItem(request)
        return ResponseEntity.ok("Item processed successfully")
    }

    @GetMapping("/{id}")
    fun getById(
        @PathVariable id: Long,
    ): InventoryItem = service.getById(id)

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody item: InventoryItem,
    ): InventoryItem = service.update(id, item)

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable id: Long,
    ): ResponseEntity<Void> {
        service.delete(id)
        return ResponseEntity.noContent().build()
    }
}
