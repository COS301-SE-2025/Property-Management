import com.example.propertymanagement.controller.TrusteeController
import com.example.propertymanagement.model.Trustee
import com.example.propertymanagement.service.TrusteeService
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

@WebMvcTest(TrusteeController::class)
@ContextConfiguration(classes = [com.example.propertymanagement.PropertyManagemnetApplication::class])
class TrusteeControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var trusteeService: TrusteeService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    private val sampleUuid = UUID.fromString("b524597e-c438-437b-a9de-88da952349b6")

    @Test
    fun `should return trustee for valid trusteeId`() {
        val response =
            Trustee(
                uuid = sampleUuid,
                name = "Sean",
                email = "seanM03@gmail.com",
                phone = "0987456321",
                apikey = "65f465f13w84fe238",
            )
        given(trusteeService.getByUuid(sampleUuid)).willReturn(response)

        mockMvc
            .perform(get("/api/trustee/$sampleUuid"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(4))
            .andExpect(jsonPath("$.name").value("Sean"))
            .andExpect(jsonPath("$.email").value("seanM03@gmail.com"))
            .andExpect(jsonPath("$.phone").value("0987456321"))
            .andExpect(jsonPath("$.apikey").value("65f465f13w84fe238"))
    }

    // @Test
    // fun `should return 404 when trustee not found`() {
    //     val unknownUuid = UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")
    //     given(trusteeService.getByUuid(unknownUuid)).willThrow(NoSuchElementException("trustee not found: $unknownUuid"))

    //     mockMvc
    //         .perform(get("/api/trustee/$unknownUuid"))
    //         .andExpect(status().isNotFound)
    //         .andExpect(jsonPath("$.error").value("trustee not found: $unknownUuid"))
    // }

    @Test
    fun `should return 400 when trusteeUuid is invalid format`() {
        mockMvc
            .perform(get("/api/trustee/invalid-uuid-format"))
            .andExpect(status().isBadRequest)
    }

    // @Test
    // fun `should return 400 when trusteeId is non-numeric`() {
    //     mockMvc
    //         .perform(get("/api/trustee/abc"))
    //         .andExpect(status().isBadRequest)
    // }

    // @Test
    // fun `should return 404 when trusteeId is negative`() {
    //     given(trusteeService.getById(-1)).willThrow(NoSuchElementException("Item not found: -1"))
    //     mockMvc
    //         .perform(get("/api/trustee/-1"))
    //         .andExpect(status().isNotFound)
    //         .andExpect(jsonPath("$.error").value("Item not found: -1"))
    // }

    // @Test
    // fun `should return 404 when trusteeId is zero`() {
    //     given(trusteeService.getById(0)).willThrow(NoSuchElementException("Item not found: 0"))
    //     mockMvc
    //         .perform(get("/api/trustee/0"))
    //         .andExpect(status().isNotFound)
    //         .andExpect(jsonPath("$.error").value("Item not found: 0"))
    // }

    @Test
    fun `should return 405 for unsupported HTTP method`() {
        mockMvc
            .perform(post("/api/trustee/$sampleUuid").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isMethodNotAllowed)
    }
}