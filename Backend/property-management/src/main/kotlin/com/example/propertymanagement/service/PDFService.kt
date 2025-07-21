import org.springframework.stereotype.Service
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import software.amazon.awssdk.services.s3.presigner.S3Presigner
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest
import java.net.URL
import java.time.Duration

@Service
class S3Service(private val s3Client: S3Client) {

    private val bucketName = "your-bucket-name"

    fun generatePresignedUploadUrl(key: String): URL {
        val putObjectRequest = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .contentType("application/pdf")
            .build()

        val presigner = S3Presigner.builder()
            .region(s3Client.region())
            .credentialsProvider(s3Client.credentialsProvider())
            .build()

        val presignRequest = PutObjectPresignRequest.builder()
            .putObjectRequest(putObjectRequest)
            .signatureDuration(Duration.ofMinutes(15))
            .build()

        val presignedRequest = presigner.presignPutObject(presignRequest)
        presigner.close()

        return presignedRequest.url()
    }
}
