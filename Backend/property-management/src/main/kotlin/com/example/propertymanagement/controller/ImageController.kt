package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.ImageMeta
import com.example.propertymanagement.repository.ImageRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.GetObjectRequest
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import software.amazon.awssdk.services.s3.presigner.S3Presigner
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest
import java.time.Duration
import java.util.*

@RestController
@RequestMapping("/api/images")
class ImageController(
    private val s3Client: S3Client,
    private val s3Presigner: S3Presigner,
    private val imageRepository: ImageRepository,
) {
    @Value("\${aws.bucket-name:default-bucket}")
    lateinit var bucketName: String

    /**
     * Generate presigned upload URL for a single image
     */
    @GetMapping("/presigned-upload/{filename}")
    fun generatePresignedUploadUrl(
        @PathVariable filename: String,
    ): ResponseEntity<Map<String, String>> {
        val id = UUID.randomUUID().toString()
        val key = "uploads-$id-$filename"

        val putObjectRequest = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .contentType("image/jpeg")
            .build()

        val presignRequest = PutObjectPresignRequest.builder()
            .putObjectRequest(putObjectRequest)
            .signatureDuration(Duration.ofMinutes(15))
            .build()

        val presignedRequest = s3Presigner.presignPutObject(presignRequest)
        val uploadUrl = presignedRequest.url().toString()

        return ResponseEntity.ok(
            mapOf(
                "uploadUrl" to uploadUrl,
                "fileKey" to key,
                "id" to id
            )
        )
    }

    /**
     * Notify that upload is complete and save metadata to database
     */
    @PostMapping("/notify-upload/{id}/{filename}/{key}/{userUuid}")
    fun notifyUploadComplete(
        @PathVariable id: String,
        @PathVariable filename: String,
        @PathVariable key: String,
        @PathVariable userUuid: UUID,
        @RequestParam("taskUuid", required = false) taskUuid: UUID?
    ): ResponseEntity<String> {
        val url = "https://$bucketName.s3.amazonaws.com/$key"
        
        val imageMeta = ImageMeta(
            id = id,
            filename = filename,
            url = url,
            task_uuid = taskUuid,
            user_uuid = userUuid
        )
        
        imageRepository.save(imageMeta)
        
        return ResponseEntity.ok("Upload metadata saved.")
    }

    /**
     * Get presigned URL for a single image by ID.
     */
    @GetMapping("/presigned/{id}")
    fun getPresignedUrlById(@PathVariable id: String): ResponseEntity<String> {
        val image = imageRepository.findById(id).orElseThrow {
            NoSuchElementException("Image not found with id $id")
        }

        val presignedUrl = createPresignedUrl(image.url)

        return ResponseEntity
            .ok()
            .contentType(MediaType.TEXT_PLAIN)
            .body(presignedUrl)
    }

    /**
     * Get presigned URLs for all images linked to a given user.
     */
    @GetMapping("/presigned/user/{userUuid}")
    fun getPresignedUrlsByUser(@PathVariable userUuid: UUID): ResponseEntity<List<String>> {
        val images = imageRepository.findAll()
            .filter { it.user_uuid == userUuid }

        val urls = images.map { createPresignedUrl(it.url) }

        return ResponseEntity.ok(urls)
    }

    /**
     * Get presigned URLs for all images linked to a given task.
     */
    @GetMapping("/presigned/task/{taskUuid}")
    fun getPresignedUrlsByTask(@PathVariable taskUuid: UUID): ResponseEntity<List<String>> {
        val images = imageRepository.findAll()
            .filter { it.task_uuid == taskUuid }

        val urls = images.map { createPresignedUrl(it.url) }

        return ResponseEntity.ok(urls)
    }

    /**
     * Get all images by user UUID (similar to PDF controller pattern)
     */
    @GetMapping("/user/{userUuid}")
    fun getByUserUuid(@PathVariable userUuid: UUID): ResponseEntity<List<ImageMeta>> {
        return try {
            val images = imageRepository.findAll().filter { it.user_uuid == userUuid }
            ResponseEntity.ok(images)
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        }
    }

    /**
     * Get all images by task UUID
     */
    @GetMapping("/task/{taskUuid}")
    fun getByTaskUuid(@PathVariable taskUuid: UUID): ResponseEntity<List<ImageMeta>> {
        return try {
            val images = imageRepository.findAll().filter { it.task_uuid == taskUuid }
            ResponseEntity.ok(images)
        } catch (e: NoSuchElementException) {
            ResponseEntity.notFound().build()
        }
    }

    /**
     * Helper: create presigned URL from stored S3 URL.
     */
    private fun createPresignedUrl(storedUrl: String): String {
        val key = extractKeyFromUrl(storedUrl)

        val getObjectRequest = GetObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .build()

        val presignRequest = GetObjectPresignRequest.builder()
            .getObjectRequest(getObjectRequest)
            .signatureDuration(Duration.ofMinutes(10))
            .build()

        return s3Presigner.presignGetObject(presignRequest).url().toString()
    }

    private fun extractKeyFromUrl(url: String): String {
        // Assuming URL is https://bucket.s3.amazonaws.com/key
        return url.substringAfter("$bucketName.s3.amazonaws.com/")
    }
}