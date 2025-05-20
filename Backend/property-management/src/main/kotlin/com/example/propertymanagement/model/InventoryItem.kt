package com.example.propertymanagement.model

import jakarta.persistence.*

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
