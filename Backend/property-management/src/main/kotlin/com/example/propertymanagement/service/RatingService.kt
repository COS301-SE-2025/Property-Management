package com.example.propertymanagement.service

import com.example.propertymanagement.model.Rating
import com.example.propertymanagement.repository.RatingRepository
import org.springframework.stereotype.Service
import java.util.NoSuchElementException
import java.util.UUID

@Service
class RatingService(
    private val repository: RatingRepository,
) {
    fun getAll(): List<Rating> = repository.findAll()

    fun getById(id: UUID): Rating = repository.findById(id).orElseThrow { NoSuchElementException("Item not found: $id") }

    fun add(item: Rating): Rating = repository.save(item)

    fun getByUuid(uuid: UUID): Rating =
        repository.findByUuid(uuid).orElseThrow { NoSuchElementException("Rating not found: $uuid") }

    fun add(
        contractorUuid: UUID,
        comment: String,
        rating: Int,
        taskUuid: UUID,
        trusteeUuid: UUID,
    ): Rating {
        val newRating = Rating(contractorUuid = contractorUuid, 
        comment = comment, 
        rating = rating, 
        taskUuid = taskUuid,
        trusteeUuid = trusteeUuid,)
        return add(newRating)
    }

    fun updateByUuid(
        uuid: UUID,
        newItem: Rating,
    ): Rating {
        val existing = getByUuid(uuid)
        val updated =
            existing.copy(
                contractorUuid = newItem.contractorUuid ?: existing.contractorUuid,
                comment = newItem.comment ?: existing.comment,
                rating = newItem.rating ?: existing.rating,
                taskUuid = newItem.taskUuid ?: existing.taskUuid,
                trusteeUuid = newItem.trusteeUuid ?: existing.trusteeUuid,
            )
        return repository.save(updated)
    }

    fun delete(id: UUID) = repository.deleteById(id)

    fun getByContractor(uuid: UUID): Rating =
        repository.findByContractorUuid(uuid).orElseThrow { NoSuchElementException("Rating not found for uuid: $uuid") }

    fun getByTrustee(uuid: UUID): Rating =
        repository.findByTrusteeUuid(uuid).orElseThrow { NoSuchElementException("Trustee rating not found for uuid: $uuid") }
        
    fun getAverageRating(uuid: UUID): Double? =
        repository.averageContractorRating(uuid)
}
