package com.example.propertymanagement.service

import com.example.propertymanagement.dto.CreateLifecycleCostRequest
import com.example.propertymanagement.dto.LifecycleCostResponse
import com.example.propertymanagement.dto.UpdateLifecycleCostRequest
import com.example.propertymanagement.exception.RestException
import com.example.propertymanagement.model.LifecycleCost
import com.example.propertymanagement.repository.LifecycleCostRepository
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class LifecycleCostService(
    private val repository: LifecycleCostRepository
) {
    fun create(request: CreateLifecycleCostRequest): LifecycleCostResponse {
        val cost = repository.save(
            LifecycleCost(
                costUuid = UUID.randomUUID(),
                coporateUuid = request.coporateUuid,
                type = request.type,
                description = request.description,
                condition = request.condition,
                timeframe = request.timeframe,
                estimatedCost = request.estimatedCost
            )
        )
        return cost.toResponse()
    }

    fun getById(uuid: UUID): LifecycleCostResponse =
        repository.findById(uuid)
            .map { it.toResponse() }
            .orElseThrow { RestException(HttpStatus.NOT_FOUND, "LifecycleCost not found") }

    fun getByCoporateUuid(coporateUuid: UUID): List<LifecycleCostResponse> =
        repository.findByCoporateUuid(coporateUuid).map { it.toResponse() }

    fun update(uuid: UUID, request: UpdateLifecycleCostRequest): LifecycleCostResponse {
        val existing = repository.findById(uuid).orElseThrow {
            RestException(HttpStatus.NOT_FOUND, "LifecycleCost not found")
        }

        val updated = existing.copy(
            type = request.type,
            description = request.description,
            condition = request.condition,
            timeframe = request.timeframe,
            estimatedCost = request.estimatedCost
        )

        return repository.save(updated).toResponse()
    }

    fun delete(uuid: UUID): Boolean {
        return if (repository.existsById(uuid)) {
            repository.deleteById(uuid)
            true
        } else {
            false
        }
    }

    private fun LifecycleCost.toResponse() = LifecycleCostResponse(
        costUuid = costUuid,
        coporateUuid = coporateUuid,
        type = type,
        description = description,
        condition = condition,
        timeframe = timeframe,
        estimatedCost = estimatedCost
    )
}
