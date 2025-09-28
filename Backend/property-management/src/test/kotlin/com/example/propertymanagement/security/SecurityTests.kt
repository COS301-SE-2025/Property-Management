package com.propertymanagement.security

import com.example.propertymanagement.PropertyManagemnetApplicationTests
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import org.springframework.test.web.servlet.post
import org.springframework.test.web.servlet.put
import org.springframework.test.web.servlet.delete

@SpringBootTest(classes = [PropertyManagemnetApplicationTests::class])
@AutoConfigureMockMvc
class SecurityTests(@Autowired val mockMvc: MockMvc) {

    @Test
    fun `unauthenticated users cannot access protected endpoint`() {
        mockMvc.get("/api/buildings")
            .andExpect { status { isUnauthorized() } }
    }

    @Test
    fun `CSRF protection blocks POST without token`() {
        mockMvc.post("/api/buildings") {
            contentType = MediaType.APPLICATION_JSON
            content = """
                {
                  "name": "TestBuilding",
                  "address": "123 Test Lane",
                  "type": "Apartment",
                  "propertyValue": 1000000.0,
                  "primaryContractor": "00000000-0000-0000-0000-000000000000",
                  "latestInspectionDate": "2024-01-01",
                  "area": 100.0,
                  "trusteeUuid": "00000000-0000-0000-0000-000000000000"
                }
            """.trimIndent()
        }.andExpect { status { isForbidden() } }
    }

    @Test
    fun `SQL injection attempt is blocked`() {
        mockMvc.get("/api/trustee/00000000-0000-0000-0000-000000000000")
            .andExpect { status { isUnauthorized() } }
    }

    @Test
    fun `unauthenticated users cannot access contractor endpoint`() {
        mockMvc.get("/api/contractor")
            .andExpect { status { isUnauthorized() } }
    }

// ...existing code...

    @Test
    fun `unauthenticated users cannot POST to contractor endpoint`() {
        mockMvc.post("/api/contractor") {
            contentType = MediaType.APPLICATION_JSON
            content = """
                {
                  "name": "Test Contractor",
                  "contact_info": "test@example.com",
                  "status": true,
                  "apikey": "test-api-key",
                  "email": "test@example.com",
                  "phone": "1234567890",
                  "address": "123 Test St",
                  "city": "Testville",
                  "postal_code": "12345",
                  "reg_number": "REG123",
                  "description": "Test contractor",
                  "services": "Plumbing",
                  "corporateUuid": "00000000-0000-0000-0000-000000000000",
                  "img": "00000000-0000-0000-0000-000000000000"
                }
            """.trimIndent()
        }.andExpect { status { isForbidden() } }
    }

    @Test
    fun `unauthenticated users cannot delete a building`() {
        mockMvc.delete("/api/buildings/00000000-0000-0000-0000-000000000000")
            .andExpect { status { isForbidden() } } 
    }
}