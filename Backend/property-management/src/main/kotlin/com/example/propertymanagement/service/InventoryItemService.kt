package com.example.propertymanagement.service

import com.example.propertymanagement.dto.CreateInventoryItemDto
import com.example.propertymanagement.dto.InventoryItemResponseDto
import com.example.propertymanagement.exception.RestException
import com.example.propertymanagement.model.InventoryItem
import com.example.propertymanagement.repository.InventoryItemRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class InventoryItemService(
    private val inventoryItemRepository: InventoryItemRepository,
) {
    fun getAllInventoryItems(): List<InventoryItemResponseDto> {
        return inventoryItemRepository.findAll()
            .map { it.toResponseDto() }
    }

    fun getInventoryItemsByBuildingUuid(buildingUuid: UUID): List<InventoryItemResponseDto> {
        return inventoryItemRepository.findByBuildingUuid(buildingUuid)
            .map { it.toResponseDto() }
    }

    fun getInventoryItemByUuid(itemUuid: UUID): InventoryItemResponseDto {
        val item =
            inventoryItemRepository.findByItemUuid(itemUuid)
                ?: throw RestException(HttpStatus.NOT_FOUND, "Inventory item with UUID $itemUuid not found")
        return item.toResponseDto()
    }

    fun createInventoryItem(createDto: CreateInventoryItemDto): InventoryItemResponseDto {
        val inventoryItem =
            InventoryItem(
                name = createDto.name,
                unit = createDto.unit,
                quantityInStock = createDto.quantity,
                buildingUuidFk = createDto.buildingUuid,
            )

        val savedItem = inventoryItemRepository.save(inventoryItem)
        return savedItem.toResponseDto()
    }

    private fun InventoryItem.toResponseDto(): InventoryItemResponseDto {
        return InventoryItemResponseDto(
            itemUuid = this.itemUuid,
            name = this.name,
            unit = this.unit,
            quantityInStock = this.quantityInStock,
            buildingUuidFk = this.buildingUuidFk,
        )
    }
}
