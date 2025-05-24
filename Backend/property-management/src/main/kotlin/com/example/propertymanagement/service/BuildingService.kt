package com.example.propertymanagement.service

import com.example.propertymanagement.model.Building
import com.example.propertymanagement.repository.BuildingRepository
import org.springframework.stereotype.Service

@Service
class BuildingService(private val repository: BuildingRepository) {
    fun getAll(): List<Building> = repository.findAll()
}