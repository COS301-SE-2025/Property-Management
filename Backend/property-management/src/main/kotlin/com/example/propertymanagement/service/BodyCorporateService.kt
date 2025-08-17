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
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.Cacheable
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
    @CacheEvict(value = ["apiCache"], allEntries = true)
    fun registerBodyCorporate(request: CreateBodyCorporateRequest): BodyCorporateRegistrationResponse {
        if (bodyCorporateRepository.existsByEmail(request.email)) {
            throw IllegalArgumentException("Email already exists")
        }

        val username = request.email.substringBefore("@") + "_" + System.currentTimeMillis()

        val attributes =
            mutableMapOf<String, String>().apply {
                put("email", request.email)
                put("given_name", username)
                request.contactNumber?.let { put("phone_number", it) }
            }

        val cognitoUserId =
            try {
                cognitoService.signUp(
                    username = username,
                    password = request.password,
                    attributes = attributes,
                )
            } catch (e: Exception) {
                throw RuntimeException("Failed to create Cognito user: ${e.message}", e)
            }

        val bodyCorporate =
            BodyCorporate(
                corporateName = request.corporateName,
                contributionPerSqm = request.contributionPerSqm,
                totalBudget = request.totalBudget,
                email = request.email,
                userId = cognitoUserId,
                username = username,
            )

        val savedBodyCorporate =
            try {
                bodyCorporateRepository.save(bodyCorporate)
            } catch (e: Exception) {
                throw RuntimeException("Failed to save body corporate: ${e.message}", e)
            }

        return BodyCorporateRegistrationResponse(
            corporateUuid = savedBodyCorporate.corporateUuid,
            corporateName = savedBodyCorporate.corporateName,
            email = savedBodyCorporate.email!!,
            cognitoUserId = cognitoUserId,
            username = username,
            emailVerificationRequired = true,
        )
    }

    fun confirmRegistration(request: ConfirmRegistrationRequest) {
        try {
            cognitoService.confirmRegistration(request.username, request.code)
        } catch (e: Exception) {
            throw RuntimeException("Failed to confirm registration: ${e.message}", e)
        }
    }

    fun login(request: LoginRequest): LoginResponse {
        val bodyCorporate =
            bodyCorporateRepository.findByEmail(request.email)
                ?: throw IllegalArgumentException("Body corporate not found")

        return try {
            val tokens = cognitoService.login(bodyCorporate.username!!, request.password)
            LoginResponse(
                idToken = tokens.idToken,
                accessToken = tokens.accessToken,
                refreshToken = tokens.refreshToken,
                userType = "BODY_CORPORATE",
                userId = bodyCorporate.corporateUuid.toString(),
            )
        } catch (e: Exception) {
            throw RuntimeException("Cognito login failed: ${e.message}", e)
        }
    }

    @Transactional(readOnly = true)
    fun getAllBodyCorporates(pageable: Pageable): Page<BodyCorporateResponse> =
        bodyCorporateRepository
            .findAll(pageable)
            .map { it.toResponse() }

    @Cacheable(value = ["apiCache"], key = "#id")
    fun getBodyCorporateById(id: UUID): BodyCorporateResponse {
        val bodyCorporate =
            bodyCorporateRepository
                .findById(id)
                .orElseThrow { NoSuchElementException("Body corporate not found with id: $id") }
        return bodyCorporate.toResponse()
    }

    @Cacheable(value = ["apiCache"], key = "'email_'+#email")
    fun getBodyCorporateByEmail(email: String): BodyCorporateResponse {
        val bodyCorporate =
            bodyCorporateRepository.findByEmail(email)
                ?: throw NoSuchElementException("Body corporate not found with email: $email")
        return bodyCorporate.toResponse()
    }

    @Cacheable(value = ["apiCache"], key = "'user_'+#userId")
    fun getBodyCorporateByUserId(userId: String): BodyCorporateResponse {
        val bodyCorporate =
            bodyCorporateRepository.findByUserId(userId)
                ?: throw NoSuchElementException("Body corporate not found with userId: $userId")
        return bodyCorporate.toResponse()
    }

    @CacheEvict(value = ["apiCache"], key = "#id")
    fun updateBodyCorporate(
        id: UUID,
        request: UpdateBodyCorporateRequest,
    ): BodyCorporateResponse {
        val existingBodyCorporate =
            bodyCorporateRepository
                .findById(id)
                .orElseThrow { NoSuchElementException("Body corporate not found with id: $id") }

        request.email?.let { newEmail ->
            if (newEmail != existingBodyCorporate.email && bodyCorporateRepository.existsByEmail(newEmail)) {
                throw IllegalArgumentException("Email already exists")
            }
        }

        val updatedBodyCorporate =
            existingBodyCorporate.copy(
                corporateName = request.corporateName ?: existingBodyCorporate.corporateName,
                contributionPerSqm = request.contributionPerSqm ?: existingBodyCorporate.contributionPerSqm,
                totalBudget = request.totalBudget ?: existingBodyCorporate.totalBudget,
                email = request.email ?: existingBodyCorporate.email,
            )

        return bodyCorporateRepository.save(updatedBodyCorporate).toResponse()
    }

    @CacheEvict(value = ["apiCache"], key = "#id")
    fun deleteBodyCorporate(id: UUID) {
        val bodyCorporate =
            bodyCorporateRepository
                .findById(id)
                .orElseThrow { NoSuchElementException("Body corporate not found with id: $id") }

        bodyCorporateRepository.delete(bodyCorporate)
    }

    @Cacheable(value = ["apiCache"], key = "'name_'+#name")
    fun searchBodyCorporatesByName(name: String): List<BodyCorporateResponse> =
        bodyCorporateRepository
            .findByCorporateNameContainingIgnoreCase(name)
            .map { it.toResponse() }

    @Cacheable(value = ["apiCache"], key = "'contribution_'+#minContribution+'_'+#maxContribution")
    fun getBodyCorporatesByContributionRange(
        minContribution: BigDecimal,
        maxContribution: BigDecimal,
    ): List<BodyCorporateResponse> =
        bodyCorporateRepository
            .findByContributionPerSqmBetween(minContribution, maxContribution)
            .map { it.toResponse() }

    @Cacheable(value = ["apiCache"], key = "'minBudget_'+#minBudget")
    fun getBodyCorporatesByMinimumBudget(minBudget: BigDecimal): List<BodyCorporateResponse> =
        bodyCorporateRepository
            .findByTotalBudgetGreaterThanEqual(minBudget)
            .map { it.toResponse() }

    @Cacheable("apiCache")
    fun getBodyCorporateStatistics(): BodyCorporateStatistics {
        val totalCount = bodyCorporateRepository.countAllBodyCorporates()
        val totalBudget = bodyCorporateRepository.sumAllTotalBudgets() ?: BigDecimal.ZERO

        return BodyCorporateStatistics(
            totalBodyCorporates = totalCount,
            totalCombinedBudget = totalBudget,
        )
    }

    private fun BodyCorporate.toResponse(): BodyCorporateResponse =
        BodyCorporateResponse(
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
