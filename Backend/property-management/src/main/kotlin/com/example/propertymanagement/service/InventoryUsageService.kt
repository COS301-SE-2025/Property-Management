package com.example.propertymanagement.service

import com.example.propertymanagement.dto.ApprovalRequest
import com.example.propertymanagement.dto.CreateInventoryUsageRequest
import com.example.propertymanagement.dto.InventoryUsageResponse
import com.example.propertymanagement.dto.UpdateInventoryUsageRequest
import com.example.propertymanagement.model.InventoryUsage
import com.example.propertymanagement.repository.BuildingRepository
import com.example.propertymanagement.repository.InventoryItemRepository
import com.example.propertymanagement.repository.InventoryUsageRepository
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.time.LocalDate
import java.util.UUID
import java.util.concurrent.Executors

@Service
class InventoryUsageService(
    private val inventoryUsageRepository: InventoryUsageRepository,
    private val inventoryItemRepository: InventoryItemRepository,
    private val buildingRepository: BuildingRepository,
    private val objectMapper: ObjectMapper,
) {
    private val bgExecutor = Executors.newSingleThreadExecutor()
    private val forecastApiBase = System.getenv("FORECAST_API_URL") ?: "http://localhost:5000"

    fun createInventoryUsage(request: CreateInventoryUsageRequest): InventoryUsageResponse {
        val inventoryUsage =
            InventoryUsage(
                itemUuid = request.itemUuid,
                taskUuid = request.taskUuid,
                usedByContractorUuid = request.usedByContractorUuid,
                quantityUsed = request.quantityUsed,
            )

        val savedUsage = inventoryUsageRepository.save(inventoryUsage)
        return mapToResponse(savedUsage)
    }

    fun assignContractor(
        usageUuid: UUID,
        contractorUuid: UUID,
    ): InventoryUsageResponse {
        val existing =
            inventoryUsageRepository
                .findById(usageUuid)
                .orElseThrow { IllegalArgumentException("Usage not found") }

        val updated = existing.copy(usedByContractorUuid = contractorUuid)
        return mapToResponse(inventoryUsageRepository.save(updated))
    }

    fun getAllInventoryUsage(pageable: Pageable): Page<InventoryUsageResponse> =
        inventoryUsageRepository
            .findAll(pageable)
            .map { mapToResponse(it) }

    fun getInventoryUsageById(usageUuid: UUID): InventoryUsageResponse {
        val inventoryUsage =
            inventoryUsageRepository
                .findById(usageUuid)
                .orElseThrow { IllegalArgumentException("Inventory usage not found with ID: $usageUuid") }
        return mapToResponse(inventoryUsage)
    }

    fun updateInventoryUsage(
        usageUuid: UUID,
        request: UpdateInventoryUsageRequest,
    ): InventoryUsageResponse {
        val existingUsage =
            inventoryUsageRepository
                .findById(usageUuid)
                .orElseThrow { IllegalArgumentException("Inventory usage not found with ID: $usageUuid") }

        val newTrusteeApproved = request.trusteeApproved ?: existingUsage.trusteeApproved

        val newApprovalDate: LocalDate? =
            when {
                request.approvalDate != null -> request.approvalDate
                !existingUsage.trusteeApproved && newTrusteeApproved -> LocalDate.now()
                else -> existingUsage.approvalDate
            }

        val updatedUsage =
            existingUsage.copy(
                quantityUsed = request.quantityUsed ?: existingUsage.quantityUsed,
                trusteeApproved = newTrusteeApproved,
                approvalDate = newApprovalDate,
            )

        val savedUsage = inventoryUsageRepository.save(updatedUsage)

        println("🔍 Saved approved status: ${savedUsage.trusteeApproved}")
        if (savedUsage.trusteeApproved) {
            updateItemStock(savedUsage.itemUuid, -savedUsage.quantityUsed)
            println("✅ Triggering async training for item ${savedUsage.itemUuid}")
            triggerTrainingAsync(savedUsage.itemUuid)
        } else {
            println("❌ No training triggered (not approved)")
        }

        return mapToResponse(savedUsage)
    }

    fun deleteInventoryUsage(usageUuid: UUID): Boolean =
        try {
            if (!inventoryUsageRepository.existsById(usageUuid)) {
                throw IllegalArgumentException("Inventory usage not found with ID: $usageUuid")
            }
            inventoryUsageRepository.deleteById(usageUuid)
            true
        } catch (e: Exception) {
            false
        }

    fun approveInventoryUsage(
        usageUuid: UUID,
        approvalRequest: ApprovalRequest,
    ): InventoryUsageResponse {
        val existingUsage =
            inventoryUsageRepository
                .findById(usageUuid)
                .orElseThrow { IllegalArgumentException("Inventory usage not found with ID: $usageUuid") }

        println("🔍 Existing approved status: ${existingUsage.trusteeApproved} (type: ${existingUsage.trusteeApproved::class.simpleName})")

        val willApprove = approvalRequest.trusteeApproved
        val newApprovalDate: LocalDate? = if (willApprove) LocalDate.now() else null

        val updatedUsage =
            existingUsage.copy(
                trusteeApproved = willApprove,
                approvalDate = newApprovalDate,
            )

        println("🔍 Copied updated approved status: ${updatedUsage.trusteeApproved}")

        val savedUsage = inventoryUsageRepository.save(updatedUsage)

        println("🔍 Saved approved status: ${savedUsage.trusteeApproved} (type: ${savedUsage.trusteeApproved::class.simpleName})")

        if (savedUsage.trusteeApproved) {
            updateItemStock(savedUsage.itemUuid, -savedUsage.quantityUsed)
            println("✅ Triggering async training for item ${savedUsage.itemUuid}")
            triggerTrainingAsync(savedUsage.itemUuid)

            val forecastJson = getForecast(savedUsage.itemUuid, months = 1, freq = "M")
            if (forecastJson != null) {
                try {
                    val forecast = objectMapper.readValue(forecastJson, Map::class.java) as Map<String, Any>
                    val predictedUsage = (forecast["total_forecasted"] as? Int) ?: 0
                    val currentStock = getCurrentStock(savedUsage.itemUuid)
                    if (predictedUsage > currentStock) {
                        val shortage = predictedUsage - currentStock
                        println(
                            "⚠️ Shortage alert for item ${savedUsage.itemUuid}: Need $predictedUsage, have $currentStock, order $shortage",
                        )
                    }
                } catch (e: Exception) {
                    println("⚠️ Failed to parse forecast for alert: ${e.message}")
                }
            }
        } else {
            println("❌ No training triggered (not approved)")
        }

        return mapToResponse(savedUsage)
    }

    fun getItemsForBuilding(buildingUuid: UUID): List<UUID> =
        inventoryItemRepository
            .findByBuildingUuid(buildingUuid)
            .map { it.itemUuid }

    fun getBuildingForecasts(
        buildingUuid: UUID,
        months: Int = 3,
        freq: String = "M",
    ): Map<String, Any> {
        val itemUuids = getItemsForBuilding(buildingUuid)

        val buildingName =
            buildingRepository
                .findById(buildingUuid)
                .orElse(null)
                ?.name ?: "Unknown Building"

        if (itemUuids.isEmpty()) {
            return mapOf(
                "building_uuid" to buildingUuid,
                "months" to months,
                "freq" to freq,
                "items_forecasts" to emptyList<Map<String, Any>>(),
                "total_forecasted_usage" to 0,
                "total_shortage" to 0,
                "alert" to "No items found for building $buildingName",
            )
        }

        val forecasts = mutableListOf<Map<String, Any>>()
        var totalForecasted = 0
        var totalShortage = 0

        for (itemUuid in itemUuids) {
            val forecastJson = getForecast(itemUuid, months, freq)
            if (forecastJson != null) {
                try {
                    val forecastMap = objectMapper.readValue(forecastJson, Map::class.java) as Map<String, Any>
                    forecasts.add(forecastMap)
                    val itemTotal = (forecastMap["total_forecasted"] as? Int) ?: 0
                    val itemShortage = (forecastMap["shortage"] as? Int) ?: 0
                    totalForecasted += itemTotal
                    totalShortage += itemShortage
                } catch (e: Exception) {
                    println("⚠️ Failed to parse forecast for item $itemUuid: ${e.message}")
                }
            }
        }

        val alertMessage =
            if (totalShortage > 0) {
                "Shortage alert: Order $totalShortage units across ${forecasts.size} items."
            } else {
                "Sufficient stock for forecasted usage."
            }

        return mapOf(
            "building_uuid" to buildingUuid,
            "months" to months,
            "freq" to freq,
            "items_forecasts" to forecasts,
            "total_forecasted_usage" to totalForecasted,
            "total_shortage" to totalShortage,
            "alert" to alertMessage,
        )
    }

    private fun updateItemStock(
        itemUuid: UUID,
        delta: Int,
    ) {
        val item = inventoryItemRepository.findByItemUuid(itemUuid) ?: throw IllegalArgumentException("Item not found: $itemUuid")
        val currentStock = item.quantityInStock ?: 0
        val newQuantity = (currentStock + delta).coerceAtLeast(0)
        val updated = item.copy(quantityInStock = newQuantity)
        inventoryItemRepository.save(updated)
        println("🔄 Updated stock for item $itemUuid: $newQuantity")
    }

    fun getCurrentStock(itemUuid: UUID): Int {
        val item = inventoryItemRepository.findByItemUuid(itemUuid) ?: throw IllegalArgumentException("Item not found: $itemUuid")
        return item.quantityInStock ?: 0
    }

    // @Cacheable("apiCache")
    fun getUsageByItemUuid(itemUuid: UUID): List<InventoryUsageResponse> =
        inventoryUsageRepository
            .findByItemUuid(itemUuid)
            .map { mapToResponse(it) }

    // @Cacheable("apiCache")
    fun getUsageByTaskUuid(taskUuid: UUID): List<InventoryUsageResponse> =
        inventoryUsageRepository
            .findByTaskUuid(taskUuid)
            .map { mapToResponse(it) }

    // @Cacheable("apiCache")
    fun getUsageByContractorUuid(contractorUuid: UUID): List<InventoryUsageResponse> =
        inventoryUsageRepository
            .findByUsedByContractorUuid(contractorUuid)
            .map { mapToResponse(it) }

    // @Cacheable("apiCache")
    fun getApprovedUsage(): List<InventoryUsageResponse> =
        inventoryUsageRepository
            .findByTrusteeApprovedTrue()
            .map { mapToResponse(it) }

    // @Cacheable("apiCache")
    fun getPendingApprovalUsage(): List<InventoryUsageResponse> =
        inventoryUsageRepository
            .findByTrusteeApprovedFalse()
            .map { mapToResponse(it) }

    // @Cacheable("apiCache")
    fun getTotalQuantityUsedForItem(itemUuid: UUID): Int = inventoryUsageRepository.getTotalQuantityUsedForItem(itemUuid)

    // @Cacheable("apiCache")
    fun getTotalQuantityUsedByContractor(contractorUuid: UUID): Int =
        inventoryUsageRepository.getTotalQuantityUsedByContractor(contractorUuid)

    internal fun triggerTrainingAsync(itemUuid: UUID) {
        println("🚀 Starting async training trigger for $itemUuid (base URL: $forecastApiBase)")
        bgExecutor.submit {
            try {
                val restTemplate = RestTemplate()
                val urlItem = "$forecastApiBase/train-item"
                println("📤 Attempting POST to $urlItem")
                val body = mapOf("item_uuid" to itemUuid.toString())
                val headers = HttpHeaders()
                headers.contentType = MediaType.APPLICATION_JSON
                val entity = HttpEntity(body, headers)

                try {
                    val response = restTemplate.postForEntity(urlItem, entity, String::class.java)
                    println("✅ Item training success: ${response.statusCode} - ${response.body}")
                    return@submit
                } catch (e: Exception) {
                    println("❌ Item training failed: ${e::class.simpleName} - ${e.message}")
                }

                val urlAll = "$forecastApiBase/train"
                println("📤 Falling back to POST $urlAll")
                val responseAll = restTemplate.postForEntity(urlAll, null, String::class.java)
                println("✅ Full training success: ${responseAll.statusCode} - ${responseAll.body}")
            } catch (outer: Exception) {
                println("⚠️ Unexpected error in training trigger: ${outer::class.simpleName} - ${outer.message}")
            }
        }
    }

    fun getForecast(
        itemUuid: UUID,
        months: Int = 3,
        freq: String = "D",
    ): String? =
        try {
            val restTemplate = RestTemplate()
            val url = "$forecastApiBase/forecast"
            val body = mapOf("item_uuid" to itemUuid.toString(), "months" to months, "freq" to freq)
            val headers = HttpHeaders()
            headers.contentType = MediaType.APPLICATION_JSON
            val entity = HttpEntity(body, headers)
            val resp = restTemplate.postForEntity(url, entity, String::class.java)
            resp.body
        } catch (e: Exception) {
            println("⚠️ Failed to get forecast for $itemUuid: ${e.message}")
            null
        }

    private fun mapToResponse(inventoryUsage: InventoryUsage): InventoryUsageResponse =
        InventoryUsageResponse(
            usageUuid = inventoryUsage.usageUuid,
            itemUuid = inventoryUsage.itemUuid,
            taskUuid = inventoryUsage.taskUuid,
            usedByContractorUuid = inventoryUsage.usedByContractorUuid,
            quantityUsed = inventoryUsage.quantityUsed,
            trusteeApproved = inventoryUsage.trusteeApproved,
            approvalDate = inventoryUsage.approvalDate,
        )
}
