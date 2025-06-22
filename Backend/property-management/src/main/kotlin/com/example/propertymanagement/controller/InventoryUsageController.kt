package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.CreateInventoryUsageRequest
import com.example.propertymanagement.dto.InventoryUsageResponse
import com.example.propertymanagement.dto.UpdateInventoryUsageRequest
import com.example.propertymanagement.dto.ApprovalRequest
import com.example.propertymanagement.service.InventoryUsageService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import jakarta.validation.Valid
import java.util.UUID


@RestController
@RequestMapping("/api/inventory-usage")
@CrossOrigin(origins = ["*"])
class InventoryUsageController(
    private val inventoryUsageService: InventoryUsageService
) {

    @PostMapping
    fun createInventoryUsage(@RequestBody request: CreateInventoryUsageRequest): ResponseEntity<InventoryUsageResponse> {
        return try {
            val response = inventoryUsageService.createInventoryUsage(request)
            ResponseEntity.status(HttpStatus.CREATED).body(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
    }

    @GetMapping
    fun getAllInventoryUsage(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
        @RequestParam(defaultValue = "usageUuid") sortBy: String,
        @RequestParam(defaultValue = "asc") sortDir: String
    ): ResponseEntity<Page<InventoryUsageResponse>> {
        return try {
            val sort = if (sortDir.equals("desc", ignoreCase = true)) {
                Sort.by(sortBy).descending()
            } else {
                Sort.by(sortBy).ascending()
            }
            val pageable: Pageable = PageRequest.of(page, size, sort)
            val response = inventoryUsageService.getAllInventoryUsage(pageable)
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

      @GetMapping("/{usageUuid}")
    fun getInventoryUsageById(@PathVariable usageUuid: UUID): ResponseEntity<InventoryUsageResponse> {
        return try {
            val response = inventoryUsageService.getInventoryUsageById(usageUuid)
            ResponseEntity.ok(response)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @PutMapping("/{usageUuid}")
    fun updateInventoryUsage(
        @PathVariable usageUuid: UUID,
        @RequestBody request: UpdateInventoryUsageRequest
    ): ResponseEntity<InventoryUsageResponse> {
        return try {
            val response = inventoryUsageService.updateInventoryUsage(usageUuid, request)
            ResponseEntity.ok(response)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
    }

    @DeleteMapping("/{usageUuid}")
    fun deleteInventoryUsage(@PathVariable usageUuid: UUID): ResponseEntity<Map<String, String>> {
        return try {
            val success = inventoryUsageService.deleteInventoryUsage(usageUuid)
            if (success) {
                ResponseEntity.ok(mapOf<String, String>("message" to "Inventory usage deleted successfully"))
            } else {
                ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(mapOf<String, String>("error" to "Failed to delete inventory usage"))
            }
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf<String, String>("error" to (e.message ?: "Inventory usage not found")))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(mapOf<String, String>("error" to "Internal server error"))
        }
    }


     @PatchMapping("/{usageUuid}/approval")
    fun approveInventoryUsage(
        @PathVariable usageUuid: UUID,
        @RequestBody approvalRequest: ApprovalRequest
    ): ResponseEntity<InventoryUsageResponse> {
        return try {
            val response = inventoryUsageService.approveInventoryUsage(usageUuid, approvalRequest)
            ResponseEntity.ok(response)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
    }

    @GetMapping("/by-item/{itemUuid}")
    fun getUsageByItemUuid(@PathVariable itemUuid: UUID): ResponseEntity<List<InventoryUsageResponse>> {
        return try {
            val response = inventoryUsageService.getUsageByItemUuid(itemUuid)
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @GetMapping("/by-task/{taskUuid}")
    fun getUsageByTaskUuid(@PathVariable taskUuid: UUID): ResponseEntity<List<InventoryUsageResponse>> {
        return try {
            val response = inventoryUsageService.getUsageByTaskUuid(taskUuid)
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @GetMapping("/by-contractor/{contractorUuid}")
    fun getUsageByContractorUuid(@PathVariable contractorUuid: UUID): ResponseEntity<List<InventoryUsageResponse>> {
        return try {
            val response = inventoryUsageService.getUsageByContractorUuid(contractorUuid)
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }
    
    @GetMapping("/approved")
    fun getApprovedUsage(): ResponseEntity<List<InventoryUsageResponse>> {
        return try {
            val response = inventoryUsageService.getApprovedUsage()
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @GetMapping("/pending-approval")
    fun getPendingApprovalUsage(): ResponseEntity<List<InventoryUsageResponse>> {
        return try {
            val response = inventoryUsageService.getPendingApprovalUsage()
            ResponseEntity.ok(response)
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @GetMapping("/total-quantity/item/{itemUuid}")
    fun getTotalQuantityUsedForItem(@PathVariable itemUuid: UUID): ResponseEntity<Map<String, Int>> {
        return try {
            val totalQuantity = inventoryUsageService.getTotalQuantityUsedForItem(itemUuid)
            ResponseEntity.ok(mapOf("totalQuantityUsed" to totalQuantity))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }

    @GetMapping("/total-quantity/contractor/{contractorUuid}")
    fun getTotalQuantityUsedByContractor(@PathVariable contractorUuid: UUID): ResponseEntity<Map<String, Int>> {
        return try {
            val totalQuantity = inventoryUsageService.getTotalQuantityUsedByContractor(contractorUuid)
            ResponseEntity.ok(mapOf("totalQuantityUsed" to totalQuantity))
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
        }
    }
}