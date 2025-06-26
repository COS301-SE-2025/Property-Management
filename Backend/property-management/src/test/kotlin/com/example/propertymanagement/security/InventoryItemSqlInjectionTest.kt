package com.example.propertymanagement.security

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.delete
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.patch
import org.springframework.test.web.servlet.put

@SpringBootTest
@AutoConfigureMockMvc
class InventoryItemSqlInjectionTest(
    @Autowired val mockMvc: MockMvc,
) {

    @Test
    fun `get inventory item by uuid endpoint should not be vulnerable to SQL injection`() {
        val maliciousUuid = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        mockMvc.get("/api/inventory/$maliciousUuid") {
            accept(MediaType.APPLICATION_JSON)
        }.andExpect {
            status { is4xxClientError() }
        }
    }

    @Test
    fun `get inventory items by building uuid endpoint should not be vulnerable to SQL injection`() {
        val maliciousBuildingUuid = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        mockMvc.get("/api/inventory/building/$maliciousBuildingUuid") {
            accept(MediaType.APPLICATION_JSON)
        }.andExpect {
            status { is4xxClientError() }
        }
    }

    @Test
    fun `update inventory item by uuid endpoint should not be vulnerable to SQL injection`() {
        val maliciousUuid = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        val updateJson = """
            {
                "name": "Updated Item",
                "unit": "pieces",
                "quantity": 10
            }
        """.trimIndent()

        mockMvc.put("/api/inventory/$maliciousUuid") {
            contentType = MediaType.APPLICATION_JSON
            content = updateJson
            accept(MediaType.APPLICATION_JSON)
        }.andExpect {
            status { is4xxClientError() }
        }
    }

    @Test
    fun `update quantity by uuid endpoint should not be vulnerable to SQL injection`() {
        val maliciousUuid = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        val quantityUpdateJson = """
            {
                "quantity": 5,
                "operation": "SET"
            }
        """.trimIndent()

        mockMvc.patch("/api/inventory/$maliciousUuid/quantity") {
            contentType = MediaType.APPLICATION_JSON
            content = quantityUpdateJson
            accept(MediaType.APPLICATION_JSON)
        }.andExpect {
            status { is4xxClientError() }
        }
    }

    @Test
    fun `delete inventory item by uuid endpoint should not be vulnerable to SQL injection`() {
        val maliciousUuid = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        mockMvc.delete("/api/inventory/$maliciousUuid") {
            accept(MediaType.APPLICATION_JSON)
        }.andExpect {
            status { is4xxClientError() }
        }
    }

    @Test
    fun `update inventory item should handle SQL injection in request body`() {
        val validUuid = "123e4567-e89b-12d3-a456-426614174000"
        val maliciousUpdateJson = """
            {
                "name": "Item'; DROP TABLE inventoryitem;--",
                "unit": "pieces' OR '1'='1",
                "quantity": 10
            }
        """.trimIndent()

        mockMvc.put("/api/inventory/$validUuid") {
            contentType = MediaType.APPLICATION_JSON
            content = maliciousUpdateJson
            accept(MediaType.APPLICATION_JSON)
        }.andExpect {
            status { isNotFound() }
        }
    }

    @Test
    fun `update quantity should handle SQL injection in request body`() {
        val validUuid = "123e4567-e89b-12d3-a456-426614174000"
        val maliciousQuantityJson = """
            {
                "quantity": 5,
                "operation": "SET'; DROP TABLE inventoryitem;--"
            }
        """.trimIndent()

        mockMvc.patch("/api/inventory/$validUuid/quantity") {
            contentType = MediaType.APPLICATION_JSON
            content = maliciousQuantityJson
            accept(MediaType.APPLICATION_JSON)
        }.andExpect {
            status { is4xxClientError() }
        }
    }
}
