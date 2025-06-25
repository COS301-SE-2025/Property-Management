package com.example.propertymanagement.dto

import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Digits
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.math.BigDecimal
import java.util.UUID

data class CreateBodyCorporateRequest(
    @field:NotBlank(message = "Corporate name is required")
    @field:Size(max = 255, message = "Corporate name must be less than 255 characters")
    val corporateName: String,
    
    @field:NotNull(message = "Contribution per SQM is required")
    @field:DecimalMin(value = "0.01", message = "Contribution per SQM must be greater than 0")
    @field:Digits(integer = 10, fraction = 2, message = "Invalid contribution per SQM format")
    val contributionPerSqm: BigDecimal,
    
    @field:DecimalMin(value = "0", message = "Total budget must be non-negative")
    @field:Digits(integer = 12, fraction = 2, message = "Invalid total budget format")
    val totalBudget: BigDecimal = BigDecimal.ZERO,
    
    @field:Email(message = "Invalid email format")
    @field:Size(max = 255, message = "Email must be less than 255 characters")
    val email: String,
    
    @field:NotBlank(message = "Password is required")
    @field:Size(min = 8, message = "Password must be at least 8 characters")
    val password: String,
    
    @field:Size(max = 20, message = "Contact number must be less than 20 characters")
    val contactNumber: String? = null
)

data class UpdateBodyCorporateRequest(
    @field:Size(max = 255, message = "Corporate name must be less than 255 characters")
    val corporateName: String? = null,
    
    @field:DecimalMin(value = "0.01", message = "Contribution per SQM must be greater than 0")
    @field:Digits(integer = 10, fraction = 2, message = "Invalid contribution per SQM format")
    val contributionPerSqm: BigDecimal? = null,
    
    @field:DecimalMin(value = "0", message = "Total budget must be non-negative")
    @field:Digits(integer = 12, fraction = 2, message = "Invalid total budget format")
    val totalBudget: BigDecimal? = null,
    
    @field:Email(message = "Invalid email format")
    @field:Size(max = 255, message = "Email must be less than 255 characters")
    val email: String? = null
)

data class BodyCorporateResponse(
    val corporateUuid: UUID,
    val corporateName: String,
    val contributionPerSqm: BigDecimal,
    val totalBudget: BigDecimal,
    val email: String?,
    val userId: String?,
    val username: String?
)

data class BodyCorporateRegistrationResponse(
    val corporateUuid: UUID,
    val corporateName: String,
    val email: String,
    val cognitoUserId: String,
    val username: String,
    val emailVerificationRequired: Boolean = true
)