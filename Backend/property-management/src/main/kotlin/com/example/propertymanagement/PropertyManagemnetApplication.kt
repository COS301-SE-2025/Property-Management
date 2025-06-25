package com.example.propertymanagement

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@ActiveProfiles("test")
@SpringBootApplication
class PropertyManagemnetApplication

fun main(args: Array<String>) {
    runApplication<PropertyManagemnetApplication>(*args)
}
