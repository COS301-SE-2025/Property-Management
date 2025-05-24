package com.example.propertymanagement.repository

import com.example.propertymanagement.model.Building
import org.springframework.data.jpa.repository.JpaRepository

interface BuildingRepository : JpaRepository<Building, Int>