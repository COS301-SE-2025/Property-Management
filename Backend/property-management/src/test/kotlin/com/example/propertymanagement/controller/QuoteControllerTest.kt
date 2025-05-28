import com.example.propertymanagement.controller.QuoteController
import com.example.propertymanagement.model.Quote
import com.example.propertymanagement.service.QuoteService
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
import java.math.BigDecimal
import java.text.SimpleDateFormat

@WebMvcTest(QuoteController::class)
@ContextConfiguration(classes = [com.example.propertymanagement.PropertyManagemnetApplication::class])
class QuoteControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockBean
    lateinit var quoteService: QuoteService

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @Test
    fun `should return quote for valid QuoteId`() {
        val response =
            Quote(
                quote_id = 10,
                task_id = 101,
                contractor_id = 3,
                amount = BigDecimal(10),
                submitted_on = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX").parse("2025-05-27T00:00:00.000+00:00"),
                type = "Maintenance",
            )

        given(quoteService.getById(10)).willReturn(response)

        mockMvc
            .perform(get("/api/quote/10"))
            .andExpect(status().isOk)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.quote_id").value(10))
            .andExpect(jsonPath("$.task_id").value(101))
            .andExpect(jsonPath("$.contractor_id").value(3))
            .andExpect(jsonPath("$.amount").value(10.00))
            .andExpect(jsonPath("$.submitted_on").value("2025-05-27T00:00:00.000+00:00"))
            .andExpect(jsonPath("$.type").value("Maintenance"))
    }

    @Test
    fun `should return 404 when quote not found`() {
        given(quoteService.getById(999)).willThrow(NoSuchElementException("Item not found: 999"))

        mockMvc
            .perform(get("/api/quote/999"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Item not found: 999"))
    }

    @Test
    fun `should return 400 when QuoteId is non-numeric`() {
        mockMvc
            .perform(get("/api/quote/abc"))
            .andExpect(status().isBadRequest)
    }

    @Test
    fun `should return 404 when QuoteId is negative`() {
        given(quoteService.getById(-1)).willThrow(NoSuchElementException("Item not found: -1"))
        mockMvc
            .perform(get("/api/quote/-1"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Item not found: -1"))
    }

    @Test
    fun `should return 404 when QuoteId is zero`() {
        given(quoteService.getById(0)).willThrow(NoSuchElementException("Item not found: 0"))
        mockMvc
            .perform(get("/api/quote/0"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Item not found: 0"))
    }

    @Test
    fun `should return 405 for unsupported HTTP method`() {
        mockMvc
            .perform(post("/api/quote/1").contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isMethodNotAllowed)
    }
}
