package com.example.propertymanagement.repository

import com.example.propertymanagement.model.InventoryItem
import org.springframework.data.jpa.repository.JpaRepository

interface InventoryItemRepository : JpaRepository<InventoryItem, Long>
