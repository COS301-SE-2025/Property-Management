package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.RatingDto
import com.example.propertymanagement.model.Rating
import com.example.propertymanagement.service.RatingService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/rating")
class RatingController(
    private val service: RatingService,
) {
    @GetMapping
    fun getAll(): List<Rating> = service.getAll()

    @GetMapping("/{uuid}")
    fun getByUuid(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Rating> {
        val rating = service.getByContractor(uuid)
        return if (rating != null) ResponseEntity.ok(rating) else ResponseEntity.notFound().build()
    }

    @GetMapping("/avg/{uuid}")
    fun getAverageRating(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Double> {
        val rating = service.getAverageRating(uuid)
        return if (rating != null) ResponseEntity.ok(rating) else ResponseEntity.notFound().build()
    }

    @PostMapping
    fun createUser(
        @RequestBody dto: RatingDto,
    ): Rating = service.add(dto.contractorUuid, dto.comment, dto.rating, dto.taskUuid, dto.trusteeUuid)

    @PutMapping("/{uuid}")
    fun update(
        @PathVariable uuid: UUID,
        @RequestBody item: Rating,
    ): Rating = service.updateByUuid(uuid, item)

    @DeleteMapping("/{uuid}")
    fun delete(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Void> {
        service.delete(uuid)
        return ResponseEntity.noContent().build()
    }
}
