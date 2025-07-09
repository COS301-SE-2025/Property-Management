package com.example.propertymanagement.service

import com.example.propertymanagement.dto.BodyCorporateRegistrationResponse
import com.example.propertymanagement.dto.BodyCorporateResponse
import com.example.propertymanagement.dto.ConfirmRegistrationRequest
import com.example.propertymanagement.dto.CreateBodyCorporateRequest
import com.example.propertymanagement.dto.LoginRequest
import com.example.propertymanagement.dto.LoginResponse
import com.example.propertymanagement.dto.UpdateBodyCorporateRequest
import com.example.propertymanagement.model.BodyCorporate
import com.example.propertymanagement.repository.BodyCorporateRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.util.UUID

@Service
@Transactional
class BodyCorporateService(
    private val bodyCorporateRepository: BodyCorporateRepository,
    private val cognitoService: CognitoService,
) {
    fun registerBodyCorporate(request: CreateBodyCorporateRequest): BodyCorporateRegistrationResponse {
        if (bodyCorporateRepository.existsByEmail(request.email)) {
            throw IllegalArgumentException("Email already exists")
        }

        val username = request.email.substringBefore("@") + "_" + System.currentTimeMillis()

        val attributes = mutableMapOf(
            "email" to request.email,
            "given_name" to username
        ).apply {
            request.contactNumber?.let { put("phone_number", it) }
        }

        val cognitoUserId = cognitoService.signUp(
            username = username,
            password = request.password,
            attributes = attributes
        )

        val bodyCorporate = BodyCorporate(
            corporateName = request.corporateName,
            contributionPerSqm = request.contributionPerSqm,
            totalBudget = request.totalBudget,
            email = request.email,
            userId = cognitoUserId,
            username = username,
        )

        val saved = bodyCorporateRepository.save(bodyCorporate)

        return BodyCorporateRegistrationResponse(
            corporateUuid = saved.corporateUuid,
            corporateName = saved.corporateName,
            email = saved.email!!,
            cognitoUserId = cognitoUserId,
            username = username,
            emailVerificationRequired = true,
        )
    }

    fun confirmRegistration(request: ConfirmRegistrationRequest): Boolean {
        return try {
            cognitoService.confirmRegistration(request.username, request.code)
            true
        } catch (_: Exception) {
            false
        }
    }

    fun login(request: LoginRequest): LoginResponse? {
        val bodyCorporate = bodyCorporateRepository.findByEmail(request.email) ?: return null
        return try {
            val tokens = cognitoService.login(bodyCorporate.username!!, request.password)
            LoginResponse(
                idToken = tokens.idToken,
                accessToken = tokens.accessToken,
                refreshToken = tokens.refreshToken,
                userType = "BODY_CORPORATE",
                userId = bodyCorporate.corporateUuid.toString(),
            )
        } catch (_: Exception) {
            null
        }
    }

    fun getAllBodyCorporates(pageable: Pageable): Page<BodyCorporateResponse> {
        return bodyCorporateRepository.findAll(pageable).map { it.toResponse() }
    }

    fun getBodyCorporateById(id: UUID): BodyCorporateResponse? {
        return bodyCorporateRepository.findById(id).map { it.toResponse() }.orElse(null)
    }

    fun getBodyCorporateByEmail(email: String): BodyCorporateResponse? {
        return bodyCorporateRepository.findByEmail(email)?.toResponse()
    }

    fun getBodyCorporateByUserId(userId: String): BodyCorporateResponse? {
        return bodyCorporateRepository.findByUserId(userId)?.toResponse()
    }

    fun updateBodyCorporate(id: UUID, request: UpdateBodyCorporateRequest): BodyCorporateResponse? {
        val existing = bodyCorporateRepository.findById(id).orElse(null) ?: return null

        request.email?.let { newEmail ->
            if (newEmail != existing.email && bodyCorporateRepository.existsByEmail(newEmail)) {
                return null
            }
        }

        val updated = existing.copy(
            corporateName = request.corporateName ?: existing.corporateName,
            contributionPerSqm = request.contributionPerSqm ?: existing.contributionPerSqm,
            totalBudget = request.totalBudget ?: existing.totalBudget,
            email = request.email ?: existing.email,
        )

        return bodyCorporateRepository.save(updated).toResponse()
    }

    fun deleteBodyCorporate(id: UUID): Boolean {
        val bodyCorporate = bodyCorporateRepository.findById(id)
        return if (bodyCorporate.isPresent) {
            bodyCorporateRepository.delete(bodyCorporate.get())
            true
        } else {
            false
        }
    }

    fun searchBodyCorporatesByName(name: String): List<BodyCorporateResponse> {
        return bodyCorporateRepository.findByCorporateNameContainingIgnoreCase(name).map { it.toResponse() }
    }

    fun getBodyCorporatesByContributionRange(min: BigDecimal, max: BigDecimal): List<BodyCorporateResponse> {
        return bodyCorporateRepository.findByContributionPerSqmBetween(min, max).map { it.toResponse() }
    }

    fun getBodyCorporatesByMinimumBudget(minBudget: BigDecimal): List<BodyCorporateResponse> {
        return bodyCorporateRepository.findByTotalBudgetGreaterThanEqual(minBudget).map { it.toResponse() }
    }

    fun getBodyCorporateStatistics(): BodyCorporateStatistics {
        val count = bodyCorporateRepository.countAllBodyCorporates()
        val total = bodyCorporateRepository.sumAllTotalBudgets() ?: BigDecimal.ZERO
        return BodyCorporateStatistics(count, total)
    }

    private fun BodyCorporate.toResponse(): BodyCorporateResponse = BodyCorporateResponse(
        corporateUuid = this.corporateUuid,
        corporateName = this.corporateName,
        contributionPerSqm = this.contributionPerSqm,
        totalBudget = this.totalBudget,
        email = this.email,
        userId = this.userId,
        username = this.username,
    )

    data class BodyCorporateStatistics(
        val totalBodyCorporates: Long,
        val totalCombinedBudget: BigDecimal,
    )
}

