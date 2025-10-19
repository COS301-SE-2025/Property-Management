package com.example.propertymanagement.repository

import com.example.propertymanagement.dto.ImageMeta
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface ImageRepository : JpaRepository<ImageMeta, String> {
    @Query(
        "SELECT * FROM image_meta i WHERE " +
            "(:userUuid IS NULL OR i.user_uuid = :userUuid) AND " +
            "(:taskUuid IS NULL OR i.task_uuid = :taskUuid) AND " +
            "(:progressUuid IS NULL OR i.progress_uuid = :progressUuid) AND " +
            "(:buildingUuid IS NULL OR i.building_uuid = :buildingUuid)",
        nativeQuery = true,
    )
    fun findByUuids(
        @Param("userUuid") userUuid: UUID?,
        @Param("taskUuid") taskUuid: UUID?,
        @Param("progressUuid") progressUuid: UUID?,
        @Param("buildingUuid") buildingUuid: UUID?,
    ): List<ImageMeta>
}
