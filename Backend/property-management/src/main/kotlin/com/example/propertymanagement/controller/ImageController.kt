package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.ImageMeta
import com.example.propertymanagement.repository.ImageRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.GetObjectRequest
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import software.amazon.awssdk.services.s3.presigner.S3Presigner
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest
import java.time.Duration
import java.util.UUID

@RestController
@RequestMapping("/api/images")
class ImageController(
    val s3Client: S3Client,
    val s3Presigner: S3Presigner,
    val imageRepository: ImageRepository,
) {
    @Value("\${aws.bucket-name:default-bucket}")
    lateinit var bucketName: String

    @PostMapping("/upload", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun upload(
        @RequestParam("file") file: MultipartFile,
    ): ResponseEntity<Map<String, String>> {
        val id = UUID.randomUUID().toString()
        val key = "uploads/$id-${file.originalFilename}"

        s3Client.putObject(
            PutObjectRequest
                .builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.contentType)
                .build(),
            RequestBody.fromBytes(file.bytes),
        )

        val imageUrl = "https://$bucketName.s3.amazonaws.com/$key"
        imageRepository.save(ImageMeta(id = id, filename = file.originalFilename ?: "unknown", url = imageUrl))

        return ResponseEntity.ok(mapOf("imageKey" to id))
    }

    @GetMapping("/presigned/{id}")
    fun getPresignedUrl(
        @PathVariable id: String,
    ): ResponseEntity<String> {
        val image = imageRepository.findById(id).orElseThrow()

        val getObjectRequest =
            GetObjectRequest
                .builder()
                .bucket(bucketName)
                .key(extractKeyFromUrl(image.url))
                .build()

        val presignRequest =
            GetObjectPresignRequest
                .builder()
                .getObjectRequest(getObjectRequest)
                .signatureDuration(Duration.ofMinutes(10)) // valid for 10 minutes
                .build()

        val presignedRequest = s3Presigner.presignGetObject(presignRequest)
        val presignedUrl = presignedRequest.url().toString()

        return ResponseEntity
            .ok()
            .contentType(MediaType.TEXT_PLAIN)
            .body(presignedUrl)
    }

    private fun extractKeyFromUrl(url: String): String {
        // Assuming URL is https://bucket.s3.amazonaws.com/key
        return url.substringAfter("$bucketName.s3.amazonaws.com/")
    }
}
