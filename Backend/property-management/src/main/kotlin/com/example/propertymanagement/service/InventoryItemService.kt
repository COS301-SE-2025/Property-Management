package com.example.propertymanagement.service

import com.example.propertymanagement.dto.CreateInventoryItemDto
import com.example.propertymanagement.dto.InventoryItemResponseDto
import com.example.propertymanagement.dto.QuantityUpdateDto
import com.example.propertymanagement.dto.UpdateInventoryItemDto
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

    fun updateInventoryItem(
        itemUuid: UUID,
        updateDto: UpdateInventoryItemDto,
    ): InventoryItemResponseDto {
        val existingItem = findInventoryItemByUuid(itemUuid)

        val updatedItem =
            existingItem.copy(
                name = updateDto.name ?: existingItem.name,
                unit = updateDto.unit ?: existingItem.unit,
                quantityInStock = updateDto.quantity ?: existingItem.quantityInStock,
            )

        val savedItem = inventoryItemRepository.save(updatedItem)
        return savedItem.toResponseDto()
    }

    fun updateQuantity(
        itemUuid: UUID,
        quantityUpdateDto: QuantityUpdateDto,
    ): InventoryItemResponseDto {
        val existingItem = findInventoryItemByUuid(itemUuid)
        val operation = QuantityUpdateDto.Operation.fromString(quantityUpdateDto.operation)

        val currentQuantity = existingItem.quantityInStock ?: 0
        val newQuantity =
            when (operation) {
                QuantityUpdateDto.Operation.SET -> quantityUpdateDto.quantity
                QuantityUpdateDto.Operation.ADD -> currentQuantity + quantityUpdateDto.quantity
                QuantityUpdateDto.Operation.SUBTRACT -> {
                    val result = currentQuantity - quantityUpdateDto.quantity
                    if (result < 0) {
                        throw RestException(
                            HttpStatus.BAD_REQUEST,
                            "Cannot subtract ${quantityUpdateDto.quantity} from current stock of $currentQuantity." +
                                "Result would be negative.",
                        )
                    }
                    result
                }
            }

        val updatedItem = existingItem.copy(quantityInStock = newQuantity)
        val savedItem = inventoryItemRepository.save(updatedItem)
        return savedItem.toResponseDto()
    }

    fun deleteInventoryItem(itemUuid: UUID) {
        val existingItem = findInventoryItemByUuid(itemUuid)
        inventoryItemRepository.delete(existingItem)
    }

    private fun findInventoryItemByUuid(itemUuid: UUID): InventoryItem {
        return inventoryItemRepository.findByItemUuid(itemUuid)
            ?: throw RestException(HttpStatus.NOT_FOUND, "Inventory item with UUID $itemUuid not found")
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
