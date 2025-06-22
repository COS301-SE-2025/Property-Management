package com.example.propertymanagement.service

import com.example.propertymanagement.dto.CreateInventoryUsageRequest
import com.example.propertymanagement.dto.InventoryUsageResponse
import com.example.propertymanagement.dto.UpdateInventoryUsageRequest
import com.example.propertymanagement.dto.ApprovalRequest
import com.example.propertymanagement.model.InventoryUsage
import com.example.propertymanagement.repository.InventoryUsageRepository
import org.springframework.stereotype.Service
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import java.util.UUID
import java.sql.Date 

@Service
class InventoryUsageService(
	private val inventoryUsageRepository: InventoryUsageRepository
) {
	fun createInventoryUsage(request: CreateInventoryUsageRequest): InventoryUsageResponse {
        val inventoryUsage = InventoryUsage(
            itemUuid = request.itemUuid,
            taskUuid = request.taskUuid,
            usedByContractorUuid = request.usedByContractorUuid,
            quantityUsed = request.quantityUsed
        )
        
        val savedUsage = inventoryUsageRepository.save(inventoryUsage)
        return mapToResponse(savedUsage)
	}

	fun getAllInventoryUsage(pageable: Pageable): Page<InventoryUsageResponse> {
        return inventoryUsageRepository.findAll(pageable)
            .map { mapToResponse(it) }
    }
    
    fun getInventoryUsageById(usageUuid: UUID): InventoryUsageResponse {
        val inventoryUsage = inventoryUsageRepository.findById(usageUuid)
            .orElseThrow { IllegalArgumentException("Inventory usage not found with ID: $usageUuid") }
        return mapToResponse(inventoryUsage)
    }

	fun updateInventoryUsage(usageUuid: UUID, request: UpdateInventoryUsageRequest): InventoryUsageResponse {
        val existingUsage = inventoryUsageRepository.findById(usageUuid)
            .orElseThrow { IllegalArgumentException("Inventory usage not found with ID: $usageUuid") }
        
        val updatedUsage = existingUsage.copy(
            quantityUsed = request.quantityUsed ?: existingUsage.quantityUsed,
            trusteeApproved = request.trusteeApproved ?: existingUsage.trusteeApproved,
            approvalDate = request.approvalDate ?: existingUsage.approvalDate
        )
        
        val savedUsage = inventoryUsageRepository.save(updatedUsage)
        return mapToResponse(savedUsage)
    }

	fun deleteInventoryUsage(usageUuid: UUID): Boolean {
        return try {
            if (!inventoryUsageRepository.existsById(usageUuid)) {
                throw IllegalArgumentException("Inventory usage not found with ID: $usageUuid")
            }
            inventoryUsageRepository.deleteById(usageUuid)
            true
        } catch (e: Exception) {
            false
        }
    }

	fun approveInventoryUsage(usageUuid: UUID, approvalRequest: ApprovalRequest): InventoryUsageResponse {
        val existingUsage = inventoryUsageRepository.findById(usageUuid)
            .orElseThrow { IllegalArgumentException("Inventory usage not found with ID: $usageUuid") }
        
        val updatedUsage = existingUsage.copy(
            trusteeApproved = approvalRequest.trusteeApproved,
            approvalDate = if (approvalRequest.trusteeApproved) approvalRequest.approvalDate else null
        )
        
        val savedUsage = inventoryUsageRepository.save(updatedUsage)
        return mapToResponse(savedUsage)
    }

	fun getUsageByItemUuid(itemUuid: UUID): List<InventoryUsageResponse> {
        return inventoryUsageRepository.findByItemUuid(itemUuid)
            .map { mapToResponse(it) }
    }
    
    fun getUsageByTaskUuid(taskUuid: UUID): List<InventoryUsageResponse> {
        return inventoryUsageRepository.findByTaskUuid(taskUuid)
            .map { mapToResponse(it) }
    }
    
    fun getUsageByContractorUuid(contractorUuid: UUID): List<InventoryUsageResponse> {
        return inventoryUsageRepository.findByUsedByContractorUuid(contractorUuid)
            .map { mapToResponse(it) }
    }
    
    fun getApprovedUsage(): List<InventoryUsageResponse> {
        return inventoryUsageRepository.findByTrusteeApprovedTrue()
            .map { mapToResponse(it) }
    }

	fun getPendingApprovalUsage(): List<InventoryUsageResponse> {
        return inventoryUsageRepository.findByTrusteeApprovedFalse()
            .map { mapToResponse(it) }
    }
    
    fun getTotalQuantityUsedForItem(itemUuid: UUID): Int {
        return inventoryUsageRepository.getTotalQuantityUsedForItem(itemUuid)
    }
    
    fun getTotalQuantityUsedByContractor(contractorUuid: UUID): Int {
        return inventoryUsageRepository.getTotalQuantityUsedByContractor(contractorUuid)
    }

	private fun mapToResponse(inventoryUsage: InventoryUsage): InventoryUsageResponse {
        return InventoryUsageResponse(
            usageUuid = inventoryUsage.usageUuid,
            itemUuid = inventoryUsage.itemUuid,
            taskUuid = inventoryUsage.taskUuid,
            usedByContractorUuid = inventoryUsage.usedByContractorUuid,
            quantityUsed = inventoryUsage.quantityUsed,
            trusteeApproved = inventoryUsage.trusteeApproved,
            approvalDate = inventoryUsage.approvalDate
        )
    }
}