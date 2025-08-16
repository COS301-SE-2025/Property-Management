package com.example.propertymanagement.service

import com.example.propertymanagement.dto.CreateTaskProgressDTO
import com.example.propertymanagement.dto.TaskProgressResponseDTO
import com.example.propertymanagement.dto.UpdateTaskProgressDTO
import com.example.propertymanagement.exception.RestException
import com.example.propertymanagement.model.TaskProgress
import com.example.propertymanagement.repository.TaskProgressRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class TaskProgressService(
    private val repository: TaskProgressRepository,
) {
    fun createTaskProgress(dto: CreateTaskProgressDTO): TaskProgressResponseDTO {
        val entity =
            TaskProgress(
                contractorUuid = dto.contractorUuid,
                taskUuid = dto.taskUuid,
                imageId = dto.imageId,
                progressPercentage = dto.progressPercentage,
                workDescription = dto.workDescription,
                inventoryUsageUuid = dto.inventoryUsageUuid,
                quantityUsed = dto.quantityUsed,
                remarks = dto.remarks,
            )
        return repository.save(entity).toResponseDTO()
    }

    fun updateTaskProgress(
        progressUuid: UUID,
        dto: UpdateTaskProgressDTO,
    ): TaskProgressResponseDTO {
        val existing =
            repository
                .findById(progressUuid)
                .orElseThrow { RestException(HttpStatus.NOT_FOUND, "Task progress not found") }

        val updated =
            existing.copy(
                progressPercentage = dto.progressPercentage ?: existing.progressPercentage,
                workDescription = dto.workDescription ?: existing.workDescription,
                imageId = dto.imageId ?: existing.imageId,
                quantityUsed = dto.quantityUsed ?: existing.quantityUsed,
                remarks = dto.remarks ?: existing.remarks,
                lastUpdated = LocalDateTime.now(),
            )

        return repository.save(updated).toResponseDTO()
    }

    //@Cacheable("apiCache")
    fun getTaskProgress(progressUuid: UUID): TaskProgressResponseDTO =
        repository
            .findById(progressUuid)
            .orElseThrow { RestException(HttpStatus.NOT_FOUND, "Task progress not found") }
            .toResponseDTO()

    //@Cacheable("apiCache")
    fun getProgressByTask(taskUuid: UUID): List<TaskProgressResponseDTO> = repository.findByTaskUuid(taskUuid).map { it.toResponseDTO() }

    fun deleteTaskProgress(progressUuid: UUID) {
        if (!repository.existsById(progressUuid)) {
            throw RestException(HttpStatus.NOT_FOUND, "Task progress not found")
        }
        repository.deleteById(progressUuid)
    }

    private fun TaskProgress.toResponseDTO() =
        TaskProgressResponseDTO(
            progressUuid = this.progressUuid,
            submissionDate = this.submissionDate,
            contractorUuid = this.contractorUuid,
            taskUuid = this.taskUuid,
            imageId = this.imageId,
            progressPercentage = this.progressPercentage,
            workDescription = this.workDescription,
            inventoryUsageUuid = this.inventoryUsageUuid,
            quantityUsed = this.quantityUsed,
            remarks = this.remarks,
            lastUpdated = this.lastUpdated,
        )
}
