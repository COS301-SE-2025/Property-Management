import com.example.propertymanagement.controller.TrusteeController
import com.example.propertymanagement.model.Trustee
import com.example.propertymanagement.service.CognitoService
import com.example.propertymanagement.service.TrusteeService
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
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
import java.util.UUID

@WebMvcTest(TrusteeController::class)
@ContextConfiguration(classes = [com.example.propertymanagement.PropertyManagemnetApplication::class])
class TrusteeControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var trusteeService: TrusteeService

    @MockBean
    lateinit var cognitoService: CognitoService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    private val sampleUuid = UUID.fromString("d7aa561f-1cdd-4c1f-a401-b47fb43747bc")

    @Test
    fun `should return trustee for valid trusteeId`() {
        val response =
            Trustee(
                trusteeUuid = sampleUuid,
                name = "Karabelo",
                email = "kabelo.moeketsi@example.com",
                phone = "013456789",
                apikey = "0210323-2313-123",
            )
        given(trusteeService.getByUuid(sampleUuid)).willReturn(response)

        mockMvc
            .perform(get("/api/trustee/$sampleUuid"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.name").value("Karabelo"))
            .andExpect(jsonPath("$.email").value("kabelo.moeketsi@example.com"))
            .andExpect(jsonPath("$.phone").value("013456789"))
            .andExpect(jsonPath("$.apikey").value("0210323-2313-123"))
    }

    @Test
    fun `should return 404 when trustee not found`() {
        val unknownUuid = UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")
        given(trusteeService.getByUuid(unknownUuid)).willThrow(NoSuchElementException("trustee not found: $unknownUuid"))

        mockMvc
            .perform(get("/api/trustee/$unknownUuid"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("trustee not found: $unknownUuid"))
    }

    @Test
    fun `should return 400 when trusteeUuid is invalid format`() {
        mockMvc
            .perform(get("/api/trustee/invalid-uuid-format"))
            .andExpect(status().isBadRequest)
    }

    @Test
    fun `should return 405 for unsupported HTTP method`() {
        mockMvc
            .perform(post("/api/trustee/$sampleUuid").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isMethodNotAllowed)
    }
}
