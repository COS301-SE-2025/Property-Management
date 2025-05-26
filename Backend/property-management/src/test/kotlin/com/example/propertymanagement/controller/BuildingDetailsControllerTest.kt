import com.example.propertymanagement.controller.BuildingDetailsController
import com.example.propertymanagement.dto.BuildingDetailsResponse
import com.example.propertymanagement.dto.MaintenanceTaskDto
import com.example.propertymanagement.service.BuildingDetailsService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@WebMvcTest(BuildingDetailsController::class)
@ContextConfiguration(classes = [com.example.propertymanagement.PropertyManagemnetApplication::class])
class BuildingDetailsControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var buildingDetailsService: BuildingDetailsService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `should return building details for valid buildingId`() {
        val response = BuildingDetailsResponse(
            name = "Building A",
            address = "123 Main St",
            totalBudget = 1000000.00,
            maintenanceBudget = 500000.00,
            inventoryBudget = 500000.00,
            inventorySpent = 50250.00,
            maintenanceSpent = 50000.00,
            maintenanceTasks = listOf(
                MaintenanceTaskDto(
                    title = "Fix Roof",
                    description = "Repair the roof",
                    status = "IN_PROGRESS",
                    approved = true,
                    proofImages = listOf()
                )
            )
        )
        given(buildingDetailsService.getBuildingDetails(1L)).willReturn(response)

        mockMvc.perform(get("/api/building/1/details"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value("Building A"))
            .andExpect(jsonPath("$.address").value("123 Main St"))
            .andExpect(jsonPath("$.totalBudget").value(1000000.00))
            .andExpect(jsonPath("$.maintenanceTasks[0].title").value("Fix Roof"))
    }

    @Test
    fun `should return 404 when building details not found`() {
        given(buildingDetailsService.getBuildingDetails(999L)).willReturn(null)

        mockMvc.perform(get("/api/building/999/details"))
            .andExpect(status().isNotFound)
    }

    @Test
    fun `should return 400 when buildingId is non-numeric`() {
        mockMvc.perform(get("/api/building/abc/details"))
            .andExpect(status().isBadRequest)
    }

    @Test
    fun `should return 404 when buildingId is negative`() {
        mockMvc.perform(get("/api/building/-1/details"))
            .andExpect(status().isNotFound)
    }

    @Test
    fun `should return 404 when buildingId is zero`() {
        mockMvc.perform(get("/api/building/0/details"))
            .andExpect(status().isNotFound)
    }

    @Test   
    fun `should return 405 for unsupported HTTP method`() {
        mockMvc.perform(post("/api/building/1/details").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isMethodNotAllowed)
    }
    
}
