package com.example.propertymanagement.integration

import com.example.propertymanagement.dto.BuildingByTrusteeDto
import com.example.propertymanagement.dto.BuildingCreateDto
import com.example.propertymanagement.dto.BuildingResponseDto
import com.example.propertymanagement.dto.BuildingUpdateDto
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import java.time.LocalDate
import java.util.UUID

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integration")
@Testcontainers
class BuildingIntegrationTest {
    companion object {
        @Container
        val postgres =
            PostgreSQLContainer<Nothing>("postgres:16").apply {
                withDatabaseName("property_management_test")
                withUsername("postgres")
                withPassword("pg123")
            }

        @JvmStatic
        @DynamicPropertySource
        fun registerPgProperties(registry: DynamicPropertyRegistry) {
            registry.add("spring.datasource.url", postgres::getJdbcUrl)
            registry.add("spring.datasource.username", postgres::getUsername)
            registry.add("spring.datasource.password", postgres::getPassword)
        }
    }

    @LocalServerPort
    var port: Int = 0

    @Autowired
    lateinit var restTemplate: TestRestTemplate

    fun createBuilding(
        name: String = "TestBuilding",
        type: String = "Apartment",
        trusteeUuid: UUID = UUID.randomUUID(),
        area: Double = 100.0,
        coporateUuid: UUID? = null,
    ): BuildingResponseDto {
        val createRequest =
            BuildingCreateDto(
                name = name,
                address = "123 Test Lane",
                type = type,
                propertyValue = 1000000.0,
                primaryContractors = arrayOf("1", "2"),
                latestInspectionDate = LocalDate.now(),
                area = area,
                trusteeUuid = trusteeUuid,
                coporateUuid = coporateUuid,
                propertyImageId = null,
            )
        val postResponse =
            restTemplate.postForEntity(
                "http://localhost:$port/api/buildings",
                createRequest,
                BuildingResponseDto::class.java,
            )
        assertEquals(201, postResponse.statusCode.value())
        return postResponse.body!!
    }

    @Test
    fun `should create building`() {
        val created = createBuilding(name = "CreateTestBuilding", area = 120.5)
        assertEquals("CreateTestBuilding", created.name)
        assertEquals(120.5, created.area)
    }

    @Test
    fun `should fetch all buildings`() {
        val created = createBuilding(name = "FetchAllTestBuilding")
        val getResponse =
            restTemplate.getForEntity(
                "http://localhost:$port/api/buildings",
                Array<BuildingResponseDto>::class.java,
            )
        assertEquals(200, getResponse.statusCode.value())
        assertTrue(getResponse.body!!.any { it.name == "FetchAllTestBuilding" })
    }

    @Test
    fun `should fetch building by UUID`() {
        val created = createBuilding(name = "FetchByIdTestBuilding")
        val getByIdResponse =
            restTemplate.getForEntity(
                "http://localhost:$port/api/buildings/${created.buildingUuid}",
                BuildingResponseDto::class.java,
            )
        assertEquals(200, getByIdResponse.statusCode.value())
        assertEquals(created.buildingUuid, getByIdResponse.body!!.buildingUuid)
        assertEquals(created.area, getByIdResponse.body!!.area)
    }

    @Test
    fun `should update building`() {
        val created = createBuilding(name = "UpdateTestBuilding", area = 100.0)
        val updateRequest =
            BuildingUpdateDto(
                name = "UpdatedName",
                area = 150.0,
            )
        val updateEntity = HttpEntity(updateRequest)
        val updateResponse =
            restTemplate.exchange(
                "http://localhost:$port/api/buildings/${created.buildingUuid}",
                HttpMethod.PUT,
                updateEntity,
                BuildingResponseDto::class.java,
            )
        assertEquals(200, updateResponse.statusCode.value())
        assertEquals("UpdatedName", updateResponse.body!!.name)
        assertEquals(150.0, updateResponse.body!!.area)
    }

    @Test
    fun `should delete building`() {
        val created = createBuilding(name = "DeleteTestBuilding")
        val deleteResponse =
            restTemplate.exchange(
                "http://localhost:$port/api/buildings/${created.buildingUuid}",
                HttpMethod.DELETE,
                null,
                Void::class.java,
            )
        assertEquals(204, deleteResponse.statusCode.value())

        val getAfterDelete =
            restTemplate.getForEntity(
                "http://localhost:$port/api/buildings/${created.buildingUuid}",
                BuildingResponseDto::class.java,
            )
        assertEquals(404, getAfterDelete.statusCode.value())
    }

    @Test
    fun `should get buildings by trustee`() {
        val trusteeUuid = UUID.randomUUID()
        val created1 = createBuilding(name = "TrusteeTestBuilding1", trusteeUuid = trusteeUuid)
        val created2 = createBuilding(name = "TrusteeTestBuilding2", trusteeUuid = trusteeUuid)
        val byTrustee =
            restTemplate.getForEntity(
                "http://localhost:$port/api/buildings/trustee/$trusteeUuid",
                BuildingByTrusteeDto::class.java,
            )
        assertEquals(200, byTrustee.statusCode.value())
        val trusteeBuildings = byTrustee.body!!.buildings
        assertTrue(trusteeBuildings.any { it.name == "TrusteeTestBuilding1" })
        assertTrue(trusteeBuildings.any { it.name == "TrusteeTestBuilding2" })
    }

    @Test
    fun `should search buildings by name`() {
        val created = createBuilding(name = "Alpha Tower")
        val search =
            restTemplate.getForEntity(
                "http://localhost:$port/api/buildings/search?name=alpha",
                Array<BuildingResponseDto>::class.java,
            )
        assertEquals(200, search.statusCode.value())
        assertTrue(search.body!!.any { it.name == "Alpha Tower" })
    }

    @Test
    fun `should get buildings by type`() {
        val created1 = createBuilding(name = "TypeTestBuilding1", type = "Office")
        val created2 = createBuilding(name = "TypeTestBuilding2", type = "Office")
        val byType =
            restTemplate.getForEntity(
                "http://localhost:$port/api/buildings/type/Office",
                Array<BuildingResponseDto>::class.java,
            )
        assertEquals(200, byType.statusCode.value())
        assertTrue(byType.body!!.any { it.name == "TypeTestBuilding1" })
        assertTrue(byType.body!!.any { it.name == "TypeTestBuilding2" })
    }
}
