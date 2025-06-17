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
import java.util.NoSuchElementException
import java.util.UUID

@WebMvcTest(ContractorController::class)
@ContextConfiguration(classes = [com.example.propertymanagement.PropertyManagemnetApplication::class])
class ContractorControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var contractorService: ContractorService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    private val sampleUuid = UUID.fromString("79443ab6-c270-4c93-8830-935d93ed858b")

    @Test
    fun `should return contractor for valid contractorUuid`() {
        val contractor =
            Contractor(
                contractorId = 3,
                contractorUuid = sampleUuid,
                name = "Jack",
                email = "jackfitnesss@gmail.com",
                phone = "0123456789",
                apikey = "d6q5d46qw54dq",
                banned = false,
            )
        given(contractorService.getByUuid(sampleUuid)).willReturn(contractor)

        mockMvc
            .perform(get("/api/contractor/$sampleUuid"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.contractorUuid").value(sampleUuid.toString()))
            .andExpect(jsonPath("$.name").value("Jack"))
            .andExpect(jsonPath("$.email").value("jackfitnesss@gmail.com"))
            .andExpect(jsonPath("$.phone").value("0123456789"))
            .andExpect(jsonPath("$.apikey").value("d6q5d46qw54dq"))
            .andExpect(jsonPath("$.banned").value(false))
    }


    @Test
    fun `should return 404 when contractor not found`() {
        val unknownUuid = UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")
        given(contractorService.getByUuid(unknownUuid)).willThrow(NoSuchElementException("Contractor not found: $unknownUuid"))

        mockMvc
            .perform(get("/api/contractor/$unknownUuid"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Contractor not found: $unknownUuid"))
    }

     @Test
    fun `should return 400 when contractorUuid is invalid format`() {
        mockMvc
            .perform(get("/api/contractor/invalid-uuid-format"))
            .andExpect(status().isBadRequest)
    }

   

    @Test
    fun `should return 405 for unsupported HTTP method`() {
        mockMvc
            .perform(post("/api/contractor/$sampleUuid").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isMethodNotAllowed)
    }
}
