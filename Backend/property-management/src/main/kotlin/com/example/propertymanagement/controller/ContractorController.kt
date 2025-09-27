package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.ConfirmRegistrationRequest
import com.example.propertymanagement.dto.LoginRequest
import com.example.propertymanagement.dto.LoginResponse
import com.example.propertymanagement.dto.RegisterRequest
import com.example.propertymanagement.model.Contractor
import com.example.propertymanagement.service.CognitoService
import com.example.propertymanagement.service.ContractorService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.NoSuchElementException
import java.util.UUID

@RestController
@RequestMapping("/api/contractor")
class ContractorController(
    private val service: ContractorService,
    private val contractorService: ContractorService,
    private val cognitoService: CognitoService,
) {
    @GetMapping()
    fun getAll(): List<Contractor> = service.getAll()

    @GetMapping("/{uuid}")
    fun getByUuid(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Contractor> =
        try {
            val contractor = service.getByUuid(uuid)
            ResponseEntity.ok(contractor)
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        }

    data class ContractorDto(
        val name: String,
        val contact_info: String,
        val status: Boolean,
        val apikey: String,
        val email: String,
        val phone: String,
        val address: String,
        val city: String,
        val postal_code: String,
        val reg_number: String,
        val description: String,
        val services: String,
        val corporateUuid: UUID? = null,
        val img: UUID,
    )

    @GetMapping("/corporate/{uuid}")
    fun getTaskByTrustee(
        @PathVariable Uuid: UUID,
    ): ResponseEntity<List<Contractor>> = ResponseEntity.ok(service.getContractorsByCorporateUuid(Uuid))

    @PostMapping
    fun createUser(
        @RequestBody contractor: ContractorDto,
    ): Contractor =
        service.addUser(
            contractor.name,
            contractor.contact_info,
            contractor.status,
            contractor.apikey,
            contractor.email,
            contractor.phone,
            contractor.address,
            contractor.city,
            contractor.postal_code,
            contractor.reg_number,
            contractor.description,
            contractor.services,
            contractor.corporateUuid ?: UUID.randomUUID(),
            contractor.img,
        )

    @PutMapping("/{uuid}")
    fun update(
        @PathVariable uuid: UUID,
        @RequestBody item: Contractor,
    ): Contractor = service.updateByUuid(uuid, item)

    @DeleteMapping("/{uuid}")
    fun delete(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Void> {
        service.deleteByUuid(uuid)
        return ResponseEntity.noContent().build()
    }

    // Auth stuff

    @PostMapping("/auth/register")
    fun register(
        @RequestBody request: RegisterRequest,
    ): ResponseEntity<Map<String, String>> {
        val passwordErrors = validatePassword(request.password)
        if (passwordErrors.isNotEmpty()) {
            return ResponseEntity.badRequest().body(mapOf("errors" to passwordErrors.joinToString(", ")))
        }

        val username = request.email.substringBefore("@") + System.currentTimeMillis()
        val cognitoUserSub =
            cognitoService.signUp(
                username,
                request.password,
                mapOf(
                    "email" to request.email,
                    "given_name" to "owner",
                ),
            )
        contractorService.addUser(
            name = username,
            contact_info = "N/A",
            status = false,
            apikey = cognitoUserSub,
            email = request.email,
            phone = request.contactNumber,
            address = "N/A",
            city = "N/A",
            postal_code = "0000",
            reg_number = "N/A",
            description = "N/A",
            services = "N/A",
            corporateUuid = UUID.randomUUID(),
            img = UUID.randomUUID(),
        )
        return ResponseEntity.ok(
            mapOf(
                "message" to "Registration successful, please verify your email.",
                "username" to username,
            ),
        )
    }

    @PostMapping("/auth/confirm")
    fun confirm(
        @RequestBody request: ConfirmRegistrationRequest,
    ): ResponseEntity<Unit> {
        cognitoService.confirmRegistration(request.username, request.code)
        return ResponseEntity.ok().build()
    }

    @PostMapping("/auth/login")
    fun login(
        @RequestBody request: LoginRequest,
    ): ResponseEntity<LoginResponse> {
        val tokens = cognitoService.login(request.email, request.password)
        val contractor = contractorService.getByEmail(request.email)

        return ResponseEntity.ok(
            LoginResponse(
                idToken = tokens.idToken,
                accessToken = tokens.accessToken,
                refreshToken = tokens.refreshToken,
                userType = "contractor",
                userId = contractor.uuid.toString(),
            ),
        )
    }

    // Optional: API key generator utility
    private fun generateApiKey(): String = UUID.randomUUID().toString().replace("-", "")

    data class PasswordResetRequest(
        val email: String,
    )

    data class PasswordResetConfirmRequest(
        val email: String,
        val confirmationCode: String,
        val newPassword: String,
    )

    @PostMapping("/auth/password-reset-request")
    fun passwordResetRequest(
        @RequestBody request: PasswordResetRequest,
    ): ResponseEntity<Map<String, String>> {
        cognitoService.initiatePasswordReset(request.email)
        return ResponseEntity.ok(mapOf("message" to "Password reset code sent to your email."))
    }

    @PostMapping("/auth/password-reset-confirm")
    fun passwordResetConfirm(
        @RequestBody request: PasswordResetConfirmRequest,
    ): ResponseEntity<Map<String, String>> {
        cognitoService.confirmPasswordReset(request.email, request.confirmationCode, request.newPassword)
        return ResponseEntity.ok(mapOf("message" to "Password has been reset successfully."))
    }

    private fun validatePassword(password: String): List<String> {
        val errors = mutableListOf<String>()
        if (password.length < 8) {
            errors.add("Password must be at least 8 characters long.")
        }
        if (!password.any { it.isUpperCase() }) {
            errors.add("Password must contain at least one uppercase letter.")
        }
        if (!password.any { it.isLowerCase() }) {
            errors.add("Password must contain at least one lowercase letter.")
        }
        if (!password.any { it.isDigit() }) {
            errors.add("Password must contain at least one number.")
        }
        if (!password.any { !it.isLetterOrDigit() }) {
            errors.add("Password must contain at least one special character.")
        }
        return errors
    }
}
