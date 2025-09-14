package com.example.propertymanagement.service

import com.example.propertymanagement.dto.LoginRequest
import com.example.propertymanagement.dto.LoginResponse
import com.example.propertymanagement.exception.RestException
import com.example.propertymanagement.model.BodyCorporate
import com.example.propertymanagement.model.Contractor
import com.example.propertymanagement.model.Trustee
import com.example.propertymanagement.repository.BodyCorporateRepository
import com.example.propertymanagement.repository.ContractorRepository
import com.example.propertymanagement.repository.TrusteeRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val bodyCorporateRepository: BodyCorporateRepository,
    private val contractorRepository: ContractorRepository,
    private val trusteeRepository: TrusteeRepository,
    private val cognitoService: CognitoService,
) {
    fun login(request: LoginRequest): LoginResponse {
        val tokens =
            try {
                cognitoService.login(request.email, request.password)
            } catch (e: Exception) {
                throw RestException(HttpStatus.UNAUTHORIZED, "Invalid email or password")
            }

        val bodyCorp: BodyCorporate? = bodyCorporateRepository.findByEmail(request.email)
        val contractor: Contractor? = contractorRepository.findByEmail(request.email).orElse(null)
        val trustee: Trustee? = trusteeRepository.findByEmail(request.email).orElse(null)

        val (userType, userId) =
            when {
                bodyCorp != null -> "bodyCorporate" to bodyCorp.corporateUuid.toString()
                contractor != null -> "contractor" to contractor.uuid.toString()
                trustee != null -> "trustee" to trustee.trusteeUuid.toString()
                else -> throw RestException(HttpStatus.NOT_FOUND, "User not found")
            }

        return LoginResponse(
            idToken = tokens.idToken,
            accessToken = tokens.accessToken,
            refreshToken = tokens.refreshToken,
            userType = userType,
            userId = userId,
        )
    }
}
