package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.UUID

@Entity
@Table(name = "inventoryitem")
data class InventoryItem(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    val itemId: Int = 0,
    @Column(name = "name")
    val name: String? = null,
    @Column(name = "unit")
    val unit: String? = null,
    @Column(name = "quantity_in_stock")
    val quantityInStock: Int? = null,
    @Column(name = "building_id")
    val buildingId: Int? = null,
    @Column(name = "item_uuid", nullable = false, unique = true)
    val itemUuid: UUID = UUID.randomUUID(),
    @Column(name = "building_uuid_fk", nullable = false)
    val buildingUuidFk: UUID,
)
