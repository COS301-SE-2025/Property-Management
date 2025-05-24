package com.example.propertymanagement.controller

import com.example.propertymanagement.model.Building
import com.example.propertymanagement.service.BuildingService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/buildings")
class BuildingController(private val service: BuildingService) {

    @GetMapping
    fun getAll(): List<Building> = service.getAll()
}