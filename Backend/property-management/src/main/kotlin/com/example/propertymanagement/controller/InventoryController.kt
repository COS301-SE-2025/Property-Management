package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.InventoryItemRequest
import com.example.propertymanagement.dto.InventoryUsageRequest
import com.example.propertymanagement.model.InventoryItem
import com.example.propertymanagement.service.InventoryService
import org.springframework.http.HttpStatus
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
class InventoryController(
    private val service: InventoryService,
) {
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
    ): ResponseEntity<Any> =
        try {
            val item = service.getById(id)
            ResponseEntity.ok(item)
        } catch (ex: NoSuchElementException) {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(mapOf("error" to ex.message))
        }

    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody item: InventoryItem,
    ): ResponseEntity<Any> =
        try {
            val updated = service.update(id, item)
            ResponseEntity.ok(updated)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(mapOf("error" to e.message))
        } catch (e: NoSuchElementException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf("error" to e.message))
        }

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable id: Long,
    ): ResponseEntity<Any> =
        try {
            service.delete(id)
            ResponseEntity.noContent().build()
        } catch (e: NoSuchElementException) {
            ResponseEntity.status(404).body(mapOf("error" to e.message))
        }

    @PostMapping("/use")
    fun useInventoryItem(
        @RequestBody request: InventoryUsageRequest,
    ): ResponseEntity<Any> =
        try {
            val updatedItem = service.useInventoryItem(request)
            ResponseEntity.ok(updatedItem)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(mapOf("error" to e.message))
        } catch (e: NoSuchElementException) {
            ResponseEntity.status(404).body(mapOf("error" to e.message))
        }
}
