package com.example.propertymanagement.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "inventoryitem")
data class InventoryItem(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    val itemId: Int = 0,
    val name: String,
    val unit: String,
    @Column(name = "quantity_in_stock")
    val quantityInStock: Int,
    @Column(name = "building_id")
    val buildingId: Int
)
