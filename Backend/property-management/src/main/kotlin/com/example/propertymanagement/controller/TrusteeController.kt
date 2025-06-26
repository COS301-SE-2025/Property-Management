package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.ConfirmRegistrationRequest
import com.example.propertymanagement.dto.LoginRequest
import com.example.propertymanagement.dto.LoginResponse
import com.example.propertymanagement.dto.RegisterRequest
import com.example.propertymanagement.model.Trustee
import com.example.propertymanagement.service.CognitoService
import com.example.propertymanagement.service.TrusteeService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/trustee")
class TrusteeController(
    private val service: TrusteeService,
    private val trusteeService: TrusteeService,
    private val cognitoService: CognitoService,
) {
    @GetMapping
    fun getAll(): List<Trustee> = service.getAll()

    @GetMapping("/{uuid}")
    fun getByUuid(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Trustee> {
        val trustee = service.getByUuid(uuid)
        return if (trustee != null) ResponseEntity.ok(trustee) else ResponseEntity.notFound().build()
    }

    data class UserDto(
        val name: String,
        val email: String,
        val phone: String,
        val apikey: String,
    )

    @PostMapping
    fun createUser(
        @RequestBody userDto: UserDto,
    ): Trustee = service.addUser(userDto.name, userDto.email, userDto.phone, userDto.apikey)

    @PutMapping("/{uuid}")
    fun update(
        @PathVariable uuid: UUID,
        @RequestBody item: Trustee,
    ): Trustee = service.updateByUuid(uuid, item)

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
        trusteeService.addUser(
            name = username,
            email = request.email,
            phone = request.contactNumber,
            apikey = cognitoUserSub,
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
    ): ResponseEntity<String> {
        cognitoService.confirmRegistration(request.username, request.code)
        return ResponseEntity.ok("Account confirmed.")
    }

    @PostMapping("/auth/login")
    fun login(
        @RequestBody request: LoginRequest,
    ): ResponseEntity<LoginResponse> {
        val tokens = cognitoService.login(request.email, request.password)
        val trustee = trusteeService.getByEmail(request.email)

        return ResponseEntity.ok(
            LoginResponse(
                idToken = tokens.idToken,
                accessToken = tokens.accessToken,
                refreshToken = tokens.refreshToken,
                userType = "trustee",
                userId = trustee.trusteeUuid.toString(),
            ),
        )
    }

    // Optional: API key generator utility
    private fun generateApiKey(): String = UUID.randomUUID().toString().replace("-", "")
}
