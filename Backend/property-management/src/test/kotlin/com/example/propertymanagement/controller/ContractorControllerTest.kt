import com.example.propertymanagement.model.Contractor
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import com.example.propertymanagement.controller.ContractorController
import com.example.propertymanagement.service.ContractorService
import com.example.propertymanagement.service.CognitoService
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.util.UUID
import org.mockito.Mockito.doNothing
import org.mockito.Mockito.`when`


@WebMvcTest(ContractorController::class)
@ContextConfiguration(classes = [com.example.propertymanagement.PropertyManagemnetApplication::class])
class ContractorControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var contractorService: ContractorService

    @MockBean
    lateinit var cognitoService: CognitoService


    @Autowired
    lateinit var objectMapper: ObjectMapper

    private val sampleUuid = UUID.fromString("d368aef5-0f2d-46a4-b32e-1e2b79cc7e28")

    @Test
    fun `should return contractor for valid contractorId`() {
        val response = Contractor(
            uuid = sampleUuid,
            name = "Karabelo",
            email = "karabelotaole04@gmail.com",
            phone = "013456789",
            apikey = "0210323-2313-123",
            contact_info = "Test",
            status = false,
            address = "Tes street",
            city = "Pretoria",
            postal_code = "0419",
            reg_number = "23123123131",
            description = "Good pipe layer",
            services = "Pipe laying"
        )
        given(contractorService.getByUuid(sampleUuid)).willReturn(response)

        mockMvc
            .perform(get("/api/contractor/$sampleUuid"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.uuid").value(sampleUuid.toString()))
            .andExpect(jsonPath("$.name").value("Karabelo"))
            .andExpect(jsonPath("$.contact_info").value("Test"))
            .andExpect(jsonPath("$.status").value(false))
            .andExpect(jsonPath("$.apikey").value("0210323-2313-123"))
            .andExpect(jsonPath("$.email").value("karabelotaole04@gmail.com"))
            .andExpect(jsonPath("$.phone").value("013456789"))
            .andExpect(jsonPath("$.address").value("Tes street"))
            .andExpect(jsonPath("$.city").value("Pretoria"))
            .andExpect(jsonPath("$.postal_code").value("0419"))
            .andExpect(jsonPath("$.reg_number").value("23123123131"))
            .andExpect(jsonPath("$.description").value("Good pipe layer"))
            .andExpect(jsonPath("$.services").value("Pipe laying"))
    }

    @Test
    fun `should return 404 when contractor not found`() {
        val unknownUuid = UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")
        given(contractorService.getByUuid(unknownUuid)).willThrow(NoSuchElementException("contractor not found: $unknownUuid"))

       mockMvc.perform(get("/api/contractor/$unknownUuid"))
        .andExpect(status().isNotFound)
        .andExpect(content().string("")) // optional: check empty response

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
