package com.example.propertymanagement.repository

import com.example.propertymanagement.dto.ImageMeta
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ImageRepository : JpaRepository<ImageMeta, String>
