package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.CreateInventoryItemDto
import com.example.propertymanagement.dto.InventoryItemResponseDto
import com.example.propertymanagement.dto.QuantityUpdateDto
import com.example.propertymanagement.dto.UpdateInventoryItemDto
import com.example.propertymanagement.service.InventoryItemService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/inventory")
class InventoryItemController(
    private val inventoryItemService: InventoryItemService,
) {
    @GetMapping
    fun getAllInventoryItems(): List<InventoryItemResponseDto> = inventoryItemService.getAllInventoryItems()

    @GetMapping("/building/{buildingUuid}")
    fun getInventoryItemsByBuilding(
        @PathVariable buildingUuid: UUID,
    ): List<InventoryItemResponseDto> = inventoryItemService.getInventoryItemsByBuildingUuid(buildingUuid)

    @GetMapping("/{itemUuid}")
    fun getInventoryItemByUuid(
        @PathVariable itemUuid: UUID,
    ): InventoryItemResponseDto = inventoryItemService.getInventoryItemByUuid(itemUuid)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createInventoryItem(
        @RequestBody createDto: CreateInventoryItemDto,
    ): InventoryItemResponseDto = inventoryItemService.createInventoryItem(createDto)

    @PutMapping("/{itemUuid}")
    fun updateInventoryItem(
        @PathVariable itemUuid: UUID,
        @Valid @RequestBody updateDto: UpdateInventoryItemDto,
    ): InventoryItemResponseDto = inventoryItemService.updateInventoryItem(itemUuid, updateDto)

    @PatchMapping("/{itemUuid}/quantity")
    fun updateQuantity(
        @PathVariable itemUuid: UUID,
        @Valid @RequestBody quantityUpdateDto: QuantityUpdateDto,
    ): InventoryItemResponseDto = inventoryItemService.updateQuantity(itemUuid, quantityUpdateDto)

    @DeleteMapping("/{itemUuid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteInventoryItem(
        @PathVariable itemUuid: UUID,
    ) {
        inventoryItemService.deleteInventoryItem(itemUuid)
    }
}
