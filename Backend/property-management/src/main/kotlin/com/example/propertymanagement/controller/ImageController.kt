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

     data class ImageWithPresignedUrl(
    val id: String,
    val filename: String,
    val presignedUrl: String,
    val taskUuid: UUID?,
    val userUuid: UUID?,
    val progressUuid: UUID?,
    val buildingUuid: UUID?
        )
    @GetMapping("/presigned-upload/{filename}")
    fun generatePresignedUploadUrl(
        @PathVariable filename: String,
    ): ResponseEntity<Map<String, String>> {
        val id = UUID.randomUUID().toString()
        val key = "uploads-$id-$filename"
        
        val contentType = getContentTypeFromFilename(filename)

        val putObjectRequest = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .contentType(contentType)
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

    private fun getContentTypeFromFilename(filename: String): String {
        val extension = filename.substringAfterLast('.', "").lowercase()
        return when (extension) {
            "jpg", "jpeg" -> "image/jpeg"
            "png" -> "image/png"
            "gif" -> "image/gif"
            "webp" -> "image/webp"
            "bmp" -> "image/bmp"
            "svg" -> "image/svg+xml"
            "tiff", "tif" -> "image/tiff"
            else -> throw IllegalArgumentException("Unsupported file type. Only image files are allowed.")
        }
    }

    /**
     * Notify that upload is complete and save metadata to database
     */
    @PostMapping("/notify-upload/{id}/{filename}/{key}")
    fun notifyUploadComplete(
        @PathVariable id: String,
        @PathVariable filename: String,
        @PathVariable key: String,
        @RequestParam("userUuid", required = false) userUuid: UUID?,
        @RequestParam("taskUuid", required = false) taskUuid: UUID?,
        @RequestParam("progressUuid", required = false) progressUuid: UUID?,
        @RequestParam("buildingUuid", required = false) buildingUuid: UUID?,
    ): ResponseEntity<String> {
        val url = "https://$bucketName.s3.amazonaws.com/$key"
        
        val imageMeta = ImageMeta(
            id = id,
            filename = filename,
            url = url,
            task_uuid = taskUuid,
            user_uuid = userUuid,
            progress_uuid = progressUuid,
            building_uuid = buildingUuid,
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

@GetMapping("/presigned")
    fun getPresignedUrl(
        @RequestParam("userUuid", required = false) userUuid: UUID?,
        @RequestParam("taskUuid", required = false) taskUuid: UUID?,
        @RequestParam("progressUuid", required = false) progressUuid: UUID?,
        @RequestParam("buildingUuid", required = false) buildingUuid: UUID?
    ): ResponseEntity<List<ImageWithPresignedUrl>> {
        if (listOfNotNull(userUuid, taskUuid, progressUuid, buildingUuid).isEmpty()) {
            throw IllegalArgumentException("At least one UUID parameter must be provided")
        }
        
        val images = imageRepository.findByUuids(userUuid, taskUuid, progressUuid, buildingUuid)
        
        if (images.isEmpty()) {
            throw NoSuchElementException("No images found with provided parameters")
        }
        
        val imagesWithUrls = images.map { image ->
            ImageWithPresignedUrl(
                id = image.id,
                filename = image.filename,
                presignedUrl = createPresignedUrl(image.url),
                taskUuid = image.task_uuid,
                userUuid = image.user_uuid,
                progressUuid = image.progress_uuid,
                buildingUuid = image.building_uuid
            )
        }
        
        return ResponseEntity.ok(imagesWithUrls)
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