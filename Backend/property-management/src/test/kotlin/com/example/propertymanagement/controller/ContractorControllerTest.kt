import com.example.propertymanagement.controller.ContractorController
import com.example.propertymanagement.model.Contractor
import com.example.propertymanagement.service.ContractorService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.kotlin.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(ContractorController::class)
@ContextConfiguration(classes = [com.example.propertymanagement.PropertyManagemnetApplication::class])
class ContractorControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var contractorService: ContractorService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `should return contractor for valid ContractorId`() {
        val response =
            Contractor(
                contractorId = 3,
                name = "Jack",
                email = "jackfitnesss@gmail.com",
                phone = "0123456789",
                apikey = "d6q5d46qw54dq",
                banned = false,
            )
        given(contractorService.getById(3)).willReturn(response)

        mockMvc.perform(get("/api/contractor/3"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.contractorId").value(3))
            .andExpect(jsonPath("$.name").value("Jack"))
            .andExpect(jsonPath("$.email").value("jackfitnesss@gmail.com"))
            .andExpect(jsonPath("$.phone").value("0123456789"))
            .andExpect(jsonPath("$.apikey").value("d6q5d46qw54dq"))
            .andExpect(jsonPath("$.banned").value(false))
    }

    @Test
    fun `should return 404 when contractor not found`() {
        given(contractorService.getById(999)).willThrow(NoSuchElementException("Item not found: 999"))

        mockMvc.perform(get("/api/contractor/999"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Item not found: 999"))
    }

    @Test
    fun `should return 400 when ContractorId is non-numeric`() {
        mockMvc.perform(get("/api/contractor/abc"))
            .andExpect(status().isBadRequest)
    }

    @Test
    fun `should return 404 when ContractorId is negative`() {
        given(contractorService.getById(-1)).willThrow(NoSuchElementException("Item not found: -1"))
        mockMvc.perform(get("/api/contractor/-1"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Item not found: -1"))
    }

    @Test
    fun `should return 404 when ContractorId is zero`() {
        given(contractorService.getById(0)).willThrow(NoSuchElementException("Item not found: 0"))
        mockMvc.perform(get("/api/contractor/0"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Item not found: 0"))
    }

    @Test
    fun `should return 405 for unsupported HTTP method`() {
        mockMvc.perform(post("/api/contractor/1").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isMethodNotAllowed)
    }
}
