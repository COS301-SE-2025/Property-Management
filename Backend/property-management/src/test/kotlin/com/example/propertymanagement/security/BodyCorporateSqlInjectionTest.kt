package com.example.propertymanagement.security

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.delete
import org.springframework.test.web.servlet.get

@SpringBootTest
@AutoConfigureMockMvc
class BodyCorporateSqlInjectionTest(
    @Autowired val mockMvc: MockMvc,
) {
    @Test
    fun `search endpoint should not be vulnerable to SQL injection`() {
        val maliciousInput = "' OR '1'='1"
        mockMvc
            .get("/api/body-corporates/search") {
                param("name", maliciousInput)
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `get by email endpoint should not be vulnerable to SQL injection`() {
        val maliciousEmail = "test@example.com' OR '1'='1"
        mockMvc
            .get("/api/body-corporates/email/$maliciousEmail") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isNotFound() }
            }
    }

    @Test
    fun `get by id endpoint should not be vulnerable to SQL injection`() {
        val maliciousId = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        mockMvc
            .get("/api/body-corporates/$maliciousId") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { is4xxClientError() }
            }
    }

    @Test
    fun `get by userId endpoint should not be vulnerable to SQL injection`() {
        val maliciousUserId = "user' OR '1'='1"
        mockMvc
            .get("/api/body-corporates/user/$maliciousUserId") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isNotFound() }
            }
    }

    @Test
    fun `filter by contribution range should not be vulnerable to SQL injection`() {
        val maliciousMin = "0 OR 1=1"
        val maliciousMax = "100 OR 1=1"
        mockMvc
            .get("/api/body-corporates/filter/contribution") {
                param("minContribution", maliciousMin)
                param("maxContribution", maliciousMax)
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { is4xxClientError() }
            }
    }

    @Test
    fun `filter by min budget should not be vulnerable to SQL injection`() {
        val maliciousMinBudget = "0 OR 1=1"
        mockMvc
            .get("/api/body-corporates/filter/budget") {
                param("minBudget", maliciousMinBudget)
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { is4xxClientError() }
            }
    }

    @Test
    fun `delete by id endpoint should not be vulnerable to SQL injection`() {
        val maliciousId = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        mockMvc
            .delete("/api/body-corporates/$maliciousId") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { is4xxClientError() }
            }
    }
}
