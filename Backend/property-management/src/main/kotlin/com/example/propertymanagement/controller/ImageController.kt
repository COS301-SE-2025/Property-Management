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
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import java.util.UUID

@RestController
@RequestMapping("/api/images")
class ImageController(
    val s3Client: S3Client,
    val imageRepository: ImageRepository,
) {
    @Value("\${aws.bucket-name:defualt-bucket}")
    lateinit var bucketName: String

    @PostMapping("/upload", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun upload(
        @RequestParam file: MultipartFile,
    ): ResponseEntity<String> {
        val id = UUID.randomUUID().toString()
        val key = "uploads/$id-${file.originalFilename}"

        s3Client.putObject(
            PutObjectRequest
                .builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.contentType ?: "application/octet-stream")
                .build(),
            RequestBody.fromBytes(file.bytes),
        )

        val imageUrl = "https://$bucketName.s3.amazonaws.com/$key"
        imageRepository.save(ImageMeta(id = id, filename = file.originalFilename ?: "unknown", url = imageUrl))

        return ResponseEntity.ok(id)
    }

    @GetMapping("/{id}")
    fun getImageUrl(
        @PathVariable id: String,
    ): ResponseEntity<String> {
        val image = imageRepository.findById(id).orElseThrow()
        return ResponseEntity.ok(image.url)
    }
}
