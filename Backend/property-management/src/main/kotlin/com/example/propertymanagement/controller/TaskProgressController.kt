package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.CreateTaskProgressDTO
import com.example.propertymanagement.dto.TaskProgressResponseDTO
import com.example.propertymanagement.dto.UpdateTaskProgressDTO
import com.example.propertymanagement.service.TaskProgressService
import org.springframework.http.HttpStatus
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
@RequestMapping("/api/task-progress")
class TaskProgressController(
    private val service: TaskProgressService,
) {
    @PostMapping
    fun createProgress(
        @RequestBody dto: CreateTaskProgressDTO,
    ): ResponseEntity<TaskProgressResponseDTO> = ResponseEntity.status(HttpStatus.CREATED).body(service.createTaskProgress(dto))

    @PutMapping("/{progressUuid}")
    fun updateProgress(
        @PathVariable progressUuid: UUID,
        @RequestBody dto: UpdateTaskProgressDTO,
    ): ResponseEntity<TaskProgressResponseDTO> = ResponseEntity.ok(service.updateTaskProgress(progressUuid, dto))

    @GetMapping("/{progressUuid}")
    fun getProgress(
        @PathVariable progressUuid: UUID,
    ): ResponseEntity<TaskProgressResponseDTO> = ResponseEntity.ok(service.getTaskProgress(progressUuid))

    @GetMapping("/task/{taskUuid}")
    fun getProgressByTask(
        @PathVariable taskUuid: UUID,
    ): ResponseEntity<List<TaskProgressResponseDTO>> = ResponseEntity.ok(service.getProgressByTask(taskUuid))

    @DeleteMapping("/{progressUuid}")
    fun deleteProgress(
        @PathVariable progressUuid: UUID,
    ): ResponseEntity<Unit> {
        service.deleteTaskProgress(progressUuid)
        return ResponseEntity.noContent().build()
    }
}
