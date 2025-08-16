package com.example.propertymanagement.controller

import com.example.propertymanagement.model.PDFMeta
import com.example.propertymanagement.repository.PDFRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.GetObjectRequest
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import software.amazon.awssdk.services.s3.presigner.S3Presigner
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest
import java.time.Duration
import java.util.UUID

@RestController
@RequestMapping("/api/upload")
class PDFController(
    val s3Client: S3Client,
    val s3Presigner: S3Presigner,
    val PDFRepository: PDFRepository,
) {
    @Value("\${aws.bucket-name:default-bucket}")
    lateinit var bucketName: String

    @GetMapping("/presigned-upload/{filename}")
    fun generatePresignedUploadUrl(
        @PathVariable filename: String,
    ): ResponseEntity<Map<String, String>> {
        val id = UUID.randomUUID().toString()
        val key = "uploads-$id-$filename"

        val putObjectRequest =
            PutObjectRequest
                .builder()
                .bucket(bucketName)
                .key(key)
                .contentType("application/pdf")
                .build()

        val presignRequest =
            software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest
                .builder()
                .putObjectRequest(putObjectRequest)
                .signatureDuration(Duration.ofMinutes(15))
                .build()

        val presignedRequest = s3Presigner.presignPutObject(presignRequest)
        val uploadUrl = presignedRequest.url().toString()

        return ResponseEntity.ok(
            mapOf(
                "uploadUrl" to uploadUrl,
                "fileKey" to key,
                "id" to id,
            ),
        )
    }

    @PostMapping("/notify-upload/{id}/{filename}/{key}/{cUuid}")
    fun notifyUploadComplete(
        @PathVariable id: String,
        @PathVariable filename: String,
        @PathVariable key: String,
        @PathVariable cUuid: UUID,
    ): ResponseEntity<String> {
        val url = "https://$bucketName.s3.amazonaws.com/$key"
        val pdfMeta =
            PDFMeta(
                id = id,
                filename = filename,
                key = key,
                url = url,
                cUuid = cUuid,
            )
        PDFRepository.save(pdfMeta)
        return ResponseEntity.ok("Upload metadata saved.")
    }

    @GetMapping("/presigned/{id}")
    fun getPresignedUrl(
        @PathVariable id: String,
    ): ResponseEntity<String> {
        val pdf = PDFRepository.findById(id).orElseThrow()

        val getObjectRequest =
            GetObjectRequest
                .builder()
                .bucket(bucketName)
                .key(extractKeyFromUrl(pdf.url))
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

    @GetMapping("/{uuid}")
    fun getByUuid(
        @PathVariable uuid: UUID,
    ): ResponseEntity<List<PDFMeta>> =
    try {
        val pdf = PDFRepository.findAllByContractorUuid(uuid)
        ResponseEntity.ok(pdf)
    } catch (e: NoSuchElementException) {
        ResponseEntity.notFound().build()
    }
}
