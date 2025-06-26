package com.example.propertymanagement.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client
import java.net.URI

@Configuration
class AwsS3Config(
    @Value("\${aws.accessKeyId}") private val accessKeyId: String,
    @Value("\${aws.secretAccessKey}") private val secretAccessKey: String,
    @Value("\${aws.region}") private val region: String,
    @Value("\${aws.s3.endpoint:}") private val endpoint: String,
) {
    @Bean
    fun s3Client(): S3Client {
        val credentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey)
        val builder =
            S3Client
                .builder()
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .region(Region.of(region))

        if (endpoint.isNotEmpty()) {
            builder.endpointOverride(URI.create(endpoint))
        }

        return builder.build()
    }
}
