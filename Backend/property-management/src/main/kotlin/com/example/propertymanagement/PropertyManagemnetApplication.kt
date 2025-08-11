package com.example.propertymanagement

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@EnableCaching
@SpringBootApplication
class PropertyManagemnetApplication

fun main(args: Array<String>) {
    runApplication<PropertyManagemnetApplication>(*args)
}
