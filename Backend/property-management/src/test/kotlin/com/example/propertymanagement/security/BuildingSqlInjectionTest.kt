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
class BuildingSqlInjectionTest(
    @Autowired val mockMvc: MockMvc,
) {
    @Test
    fun `get building by uuid endpoint should not be vulnerable to SQL injection`() {
        val maliciousUuid = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        mockMvc
            .get("/api/buildings/$maliciousUuid") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { is4xxClientError() }
            }
    }

    @Test
    fun `delete building by uuid endpoint should not be vulnerable to SQL injection`() {
        val maliciousUuid = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        mockMvc
            .delete("/api/buildings/$maliciousUuid") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { is4xxClientError() }
            }
    }

    @Test
    fun `get buildings by trustee endpoint should not be vulnerable to SQL injection`() {
        val maliciousTrusteeUuid = "123e4567-e89b-12d3-a456-426614174000' OR '1'='1"
        mockMvc
            .get("/api/buildings/trustee/$maliciousTrusteeUuid") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { is4xxClientError() }
            }
    }

    @Test
    fun `search buildings by name endpoint should not be vulnerable to SQL injection`() {
        val maliciousName = "Building' OR '1'='1"
        mockMvc
            .get("/api/buildings/search") {
                param("name", maliciousName)
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `get buildings by type endpoint should not be vulnerable to SQL injection`() {
        val maliciousType = "Residential' OR '1'='1"
        mockMvc
            .get("/api/buildings/type/$maliciousType") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `search buildings by name should handle UNION injection attempts`() {
        val unionInjection = "Building' UNION SELECT null,null,null,null,null,null,null,null,null,null,null FROM building--"
        mockMvc
            .get("/api/buildings/search") {
                param("name", unionInjection)
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `get buildings by type should handle UNION injection attempts`() {
        val unionInjection = "Residential' UNION SELECT null,null,null,null,null,null,null,null,null,null,null FROM building--"
        mockMvc
            .get("/api/buildings/type/$unionInjection") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `search buildings by name should handle time-based injection attempts`() {
        val timeBasedInjection = "Building'; WAITFOR DELAY '00:00:05'--"
        mockMvc
            .get("/api/buildings/search") {
                param("name", timeBasedInjection)
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `get buildings by type should handle boolean-based injection attempts`() {
        val booleanInjection = "Residential' AND (SELECT COUNT(building_uuid) FROM building) > 0--"
        mockMvc
            .get("/api/buildings/type/$booleanInjection") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `search buildings by name should handle comment-based injection attempts`() {
        val commentInjection = "Building'/**/OR/**/1=1--"
        mockMvc
            .get("/api/buildings/search") {
                param("name", commentInjection)
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `get buildings by type should handle nested query injection attempts`() {
        val nestedQueryInjection = "Residential' OR building_uuid IN (SELECT building_uuid FROM building WHERE 1=1)--"
        mockMvc
            .get("/api/buildings/type/$nestedQueryInjection") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `search buildings by name should handle escape character injection attempts`() {
        val escapeInjection = "Building\\' OR \\'1\\'=\\'1"
        mockMvc
            .get("/api/buildings/search") {
                param("name", escapeInjection)
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }

    @Test
    fun `get buildings by type should handle case variation injection attempts`() {
        val caseVariationInjection = "Residential' oR '1'='1"
        mockMvc
            .get("/api/buildings/type/$caseVariationInjection") {
                accept(MediaType.APPLICATION_JSON)
            }.andExpect {
                status { isOk() }
                content { contentType(MediaType.APPLICATION_JSON) }
            }
    }
}
