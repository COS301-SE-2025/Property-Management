package com.example.propertymanagement.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient
import software.amazon.awssdk.services.cognitoidentityprovider.model.AuthFlowType
import software.amazon.awssdk.services.cognitoidentityprovider.model.SignUpRequest
import software.amazon.awssdk.services.cognitoidentityprovider.model.ConfirmSignUpRequest
import software.amazon.awssdk.services.cognitoidentityprovider.model.AdminInitiateAuthRequest
import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType


@Service
class CognitoService(
    @Value("\${aws.accessKeyId}") private val accessKeyId: String,
    @Value("\${aws.secretAccessKey}") private val secretAccessKey: String,
    @Value("\${aws.region}") private val region: String,
    @Value("\${aws.cognito.userPoolId}") private val userPoolId: String,
    @Value("\${aws.cognito.clientId}") private val clientId: String
) {

    private val cognitoClient = CognitoIdentityProviderClient.builder()
        .region(Region.of(region))
        .credentialsProvider(
            StaticCredentialsProvider.create(
                AwsBasicCredentials.create(accessKeyId, secretAccessKey)
            )
        )
        .build()

    fun signUp(
        username: String,
        password: String,
        attributes: Map<String, String>
    ): String {
        val attributeList = attributes.map { (key, value) ->
            AttributeType.builder().name(key).value(value).build()
        }

        val request = SignUpRequest.builder()
            .clientId(clientId)
            .username(username)
            .password(password)
            .userAttributes(attributeList)
            .build()

        val response = cognitoClient.signUp(request)
        return response.userSub()
    }

    fun confirmRegistration(username: String, code: String) {
        val request = ConfirmSignUpRequest.builder()
            .clientId(clientId)
            .username(username)
            .confirmationCode(code)
            .build()

        cognitoClient.confirmSignUp(request)
    }

    fun login(email: String, password: String): AuthTokens {
        val authRequest = AdminInitiateAuthRequest.builder()
            .userPoolId(userPoolId)
            .clientId(clientId)
            .authFlow(AuthFlowType.ADMIN_NO_SRP_AUTH)
            .authParameters(mapOf("USERNAME" to email, "PASSWORD" to password))
            .build()

        val result = cognitoClient.adminInitiateAuth(authRequest)
        val tokens = result.authenticationResult()

        return AuthTokens(
            idToken = tokens.idToken(),
            accessToken = tokens.accessToken(),
            refreshToken = tokens.refreshToken()
        )
    }

    data class AuthTokens(
        val idToken: String,
        val accessToken: String,
        val refreshToken: String
    )
}