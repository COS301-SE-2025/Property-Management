package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.BodyCorporateRegistrationResponse
import com.example.propertymanagement.dto.BodyCorporateResponse
import com.example.propertymanagement.dto.ConfirmRegistrationRequest
import com.example.propertymanagement.dto.CreateBodyCorporateRequest
import com.example.propertymanagement.dto.LoginRequest
import com.example.propertymanagement.dto.LoginResponse
import com.example.propertymanagement.dto.UpdateBodyCorporateRequest
import com.example.propertymanagement.service.BodyCorporateService
import jakarta.validation.Valid
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal
import java.util.UUID

@RestController
@RequestMapping("/api/body-corporates")
class BodyCorporateController(
    private val bodyCorporateService: BodyCorporateService,
) {
    @PostMapping("/register")
    fun registerBodyCorporate(
        @Valid @RequestBody request: CreateBodyCorporateRequest,
    ): ResponseEntity<BodyCorporateRegistrationResponse> {
        val response = bodyCorporateService.registerBodyCorporate(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(response)
    }

    @PostMapping("/confirm-registration")
    fun confirmRegistration(
        @Valid @RequestBody request: ConfirmRegistrationRequest,
    ): ResponseEntity<Map<String, String>> =
        try {
            bodyCorporateService.confirmRegistration(request)
            ResponseEntity.ok(mapOf("message" to "Registration confirmed successfully"))
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(mapOf("error" to (e.message ?: "Confirmation failed")))
        }

    @PostMapping("/login")
    fun login(
        @Valid @RequestBody request: LoginRequest,
    ): ResponseEntity<LoginResponse> {
        val response = bodyCorporateService.login(request)
        return ResponseEntity.ok(response)
    }

    @GetMapping
    fun getAllBodyCorporates(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "20") size: Int,
        @RequestParam(defaultValue = "corporateName") sortBy: String,
        @RequestParam(defaultValue = "asc") sortDirection: String,
    ): ResponseEntity<Page<BodyCorporateResponse>> {
        val sort =
            if (sortDirection.lowercase() == "desc") {
                Sort.by(sortBy).descending()
            } else {
                Sort.by(sortBy).ascending()
            }

        val pageable: Pageable = PageRequest.of(page, size, sort)
        val bodyCorporates = bodyCorporateService.getAllBodyCorporates(pageable)
        return ResponseEntity.ok(bodyCorporates)
    }

    @GetMapping("/{id}")
    fun getBodyCorporateById(
        @PathVariable id: UUID,
    ): ResponseEntity<BodyCorporateResponse> =
        try {
            val bodyCorporate = bodyCorporateService.getBodyCorporateById(id)
            ResponseEntity.ok(bodyCorporate)
        } catch (e: NoSuchElementException) {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(null)
        }

    @GetMapping("/email/{email}")
    fun getBodyCorporateByEmail(
        @PathVariable email: String,
    ): ResponseEntity<BodyCorporateResponse> =
        try {
            val bodyCorporate = bodyCorporateService.getBodyCorporateByEmail(email)
            ResponseEntity.ok(bodyCorporate)
        } catch (e: NoSuchElementException) {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(null)
        }

    @GetMapping("/user/{userId}")
    fun getBodyCorporateByUserId(
        @PathVariable userId: String,
    ): ResponseEntity<BodyCorporateResponse> =
        try {
            val bodyCorporate = bodyCorporateService.getBodyCorporateByUserId(userId)
            ResponseEntity.ok(bodyCorporate)
        } catch (e: NoSuchElementException) {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(null)
        }

    @PutMapping("/{id}")
    fun updateBodyCorporate(
        @PathVariable id: UUID,
        @Valid @RequestBody request: UpdateBodyCorporateRequest,
    ): ResponseEntity<BodyCorporateResponse> =
        try {
            val updatedBodyCorporate = bodyCorporateService.updateBodyCorporate(id, request)
            ResponseEntity.ok(updatedBodyCorporate)
        } catch (e: NoSuchElementException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().body(null)
        }

    @DeleteMapping("/{id}")
    fun deleteBodyCorporate(
        @PathVariable id: UUID,
    ): ResponseEntity<Map<String, String>> =
        try {
            bodyCorporateService.deleteBodyCorporate(id)
            ResponseEntity.ok(mapOf("message" to "Body corporate deleted successfully"))
        } catch (e: NoSuchElementException) {
            ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(mapOf("error" to (e.message ?: "Body corporate not found")))
        }

    @GetMapping("/search")
    fun searchBodyCorporatesByName(
        @RequestParam name: String,
    ): ResponseEntity<List<BodyCorporateResponse>> {
        val bodyCorporates = bodyCorporateService.searchBodyCorporatesByName(name)
        return ResponseEntity.ok(bodyCorporates)
    }

    @GetMapping("/filter/contribution")
    fun getBodyCorporatesByContributionRange(
        @RequestParam minContribution: BigDecimal,
        @RequestParam maxContribution: BigDecimal,
    ): ResponseEntity<List<BodyCorporateResponse>> {
        val bodyCorporates =
            bodyCorporateService.getBodyCorporatesByContributionRange(
                minContribution,
                maxContribution,
            )
        return ResponseEntity.ok(bodyCorporates)
    }

    @GetMapping("/filter/budget")
    fun getBodyCorporatesByMinimumBudget(
        @RequestParam minBudget: BigDecimal,
    ): ResponseEntity<List<BodyCorporateResponse>> {
        val bodyCorporates = bodyCorporateService.getBodyCorporatesByMinimumBudget(minBudget)
        return ResponseEntity.ok(bodyCorporates)
    }

    @GetMapping("/statistics")
    fun getBodyCorporateStatistics(): ResponseEntity<BodyCorporateService.BodyCorporateStatistics> {
        val statistics = bodyCorporateService.getBodyCorporateStatistics()
        return ResponseEntity.ok(statistics)
    }
}
