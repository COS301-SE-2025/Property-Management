package com.example.propertymanagement.service

import com.example.propertymanagement.dto.MaintenanceTaskCreateDto
import com.example.propertymanagement.dto.MaintenanceTaskResponseDto
import com.example.propertymanagement.dto.MaintenanceTaskUpdateDto
import com.example.propertymanagement.model.Maintenance
import com.example.propertymanagement.model.MaintenancetaskContractor
import com.example.propertymanagement.model.MaintenancetaskContractorId
import com.example.propertymanagement.repository.BuildingRepository
import com.example.propertymanagement.repository.ContractorRepository
import com.example.propertymanagement.repository.ImageRepository
import com.example.propertymanagement.repository.MaintenanceRepository
import com.example.propertymanagement.repository.MaintenancetaskContractorRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Date
import java.util.NoSuchElementException
import java.util.UUID

@Service
class MaintenanceService(
    private val repository: MaintenanceRepository,
    private val buildingRepository: BuildingRepository,
    private val contractorRepository: ContractorRepository,
    private val imageRepository: ImageRepository,
    private val taskContractorRepository: MaintenancetaskContractorRepository,
    private val quoteService: QuoteService,
) {
    data class TaskContractorAssignDto(
        val taskUuid: UUID,
        val contractorUuids: List<UUID>,
    )

    data class QuoteCreateDto(
        val amount: Double,
        val documentUrl: String?,
        val taskUuid: UUID,
        val contractorUuid: UUID,
        val submittedOn: Date? = Date(System.currentTimeMillis()),
        val status: String = "SUBMITTED",
    )

    fun getAll(): List<Maintenance> = repository.findAll()

    fun add(item: Maintenance): Maintenance = repository.save(item)

    fun getByUuid(uuid: UUID): Maintenance =
        repository.findByUuid(uuid).orElseThrow { NoSuchElementException("Maintenance not found: $uuid") }

    fun getTasksByTrustee(tUuid: UUID): List<Maintenance> = repository.findAllBytUuid(tUuid)

    fun add(
        title: String,
        des: String,
        status: String,
        scheduledDate: java.sql.Date,
        approved: Boolean,
        bUuid: UUID,
        img: UUID,
        tUuid: UUID,
        cUuid: UUID,
    ): Maintenance {
        val newTask =
            Maintenance(
                title = title,
                des = des,
                status = status,
                scheduled_date = scheduledDate,
                approved = approved,
                bUuid = bUuid,
                createdByUuid = UUID.randomUUID(),
                img = img,
                tUuid = tUuid,
                cUuid = cUuid,
            )
        return add(newTask)
    }

    fun updateByUuid(
        uuid: UUID,
        newItem: Maintenance,
    ): Maintenance {
        val existing = getByUuid(uuid)
        val updated =
            existing.copy(
                title = newItem.title,
                des = newItem.des,
                status = newItem.status,
                scheduled_date = newItem.scheduled_date,
                approved = newItem.approved,
                bUuid = newItem.bUuid,
                createdByUuid = newItem.createdByUuid,
                img = newItem.img,
                tUuid = newItem.tUuid,
                cUuid = newItem.cUuid,
                approvalStatus = newItem.approvalStatus,
            )
        return repository.save(updated)
    }

    @Transactional
    fun deleteByUuid(uuid: UUID) = repository.deleteByUuid(uuid)

    // fun delete(id: Int) = repository.deleteById(id)

    fun createTask(
        dto: MaintenanceTaskCreateDto,
        isOwner: Boolean,
        isBodyCorporate: Boolean,
    ): MaintenanceTaskResponseDto {
        val building =
            buildingRepository.findById(dto.buildingUuid).orElseThrow {
                IllegalArgumentException("Building not found: ${dto.buildingUuid}")
            }

        // Validate imageUuid
        var imageUuid: UUID? = null
        dto.imageUuid?.let { id ->
            if (!imageRepository.existsById(id)) {
                throw IllegalArgumentException("Image not found: $id")
            }
            try {
                imageUuid = UUID.fromString(id)
            } catch (e: IllegalArgumentException) {
                throw IllegalArgumentException("Invalid image UUID format: $id")
            }
        }

        // Validate contractorUuid
        if (dto.contractorUuid != null && (!isBodyCorporate && (building.coporateUuid != null || !isOwner))) {
            throw IllegalStateException(
                "Trustees cannot assign contractors unless they are the owner and the building has no body corporate",
            )
        }

        val task =
            Maintenance(
                // uuid = UUID.randomUUID(),
                title = dto.title,
                des = dto.description ?: "",
                status = "OPEN",
                scheduled_date = dto.scheduledDate?.let { java.sql.Date.valueOf(it) },
                approved = false,
                bUuid = dto.buildingUuid,
                createdByUuid = dto.createdByUuid,
                img = imageUuid ?: UUID.randomUUID(),
                tUuid = dto.trusteeUuid,
                cUuid = if (isOwner && building.coporateUuid == null) dto.contractorUuid else null,
                approvalStatus = if (building.coporateUuid == null) "APPROVED" else "PENDING",
            )

        val savedTask = repository.save(task)
        return mapToResponseDto(savedTask)
    }

    fun updateTask(
        uuid: UUID,
        dto: MaintenanceTaskUpdateDto,
        isBodyCorporate: Boolean,
    ): MaintenanceTaskResponseDto {
        val task = getByUuid(uuid)

        if (dto.approvalStatus != null && !isBodyCorporate) {
            throw IllegalStateException("Only body corporates can update approval status")
        }

        // Validate imageUuid
        var imageUuid: UUID? = task.img
        dto.imageUuid?.let { id ->
            if (!imageRepository.existsById(id)) {
                throw IllegalArgumentException("Image not found: $id")
            }
            try {
                imageUuid = UUID.fromString(id)
            } catch (e: IllegalArgumentException) {
                throw IllegalArgumentException("Invalid image UUID format: $id")
            }
        }

        // Validate contractorUuid
        if (dto.contractorUuid != null && !isBodyCorporate) {
            throw IllegalStateException("Only body corporates can assign contractors")
        }

        val updatedTask =
            task.copy(
                title = dto.title ?: task.title,
                des = dto.description ?: task.des,
                scheduled_date = dto.scheduledDate?.let { java.sql.Date.valueOf(it) } ?: task.scheduled_date,
                approvalStatus = dto.approvalStatus ?: task.approvalStatus,
                cUuid = if (dto.approvalStatus == "APPROVED") dto.contractorUuid ?: task.cUuid else task.cUuid,
                img = imageUuid ?: task.img,
            )

        val savedTask = repository.save(updatedTask)
        return mapToResponseDto(savedTask)
    }

    fun assignContractorsToTask(
        dto: TaskContractorAssignDto,
        isBodyCorporate: Boolean,
    ) {
        if (!isBodyCorporate) {
            throw IllegalStateException("Only body corporates can assign contractors")
        }

        val task = getByUuid(dto.taskUuid)
        if (task.approvalStatus != "APPROVED") {
            throw IllegalStateException("Task must be approved before assigning contractors")
        }

        val contractorUuids: List<UUID> =
            if (dto.contractorUuids.isEmpty()) {
                contractorRepository
                    .findAll()
                    .mapNotNull { it.uuid }
            } else {
                dto.contractorUuids
            }

        contractorUuids.forEach { contractorUuid ->
            if (!contractorRepository.existsById(contractorUuid)) {
                throw IllegalArgumentException("Contractor not found: $contractorUuid")
            }
            if (!taskContractorRepository.existsByTaskUuidAndContractorUuid(dto.taskUuid, contractorUuid)) {
                taskContractorRepository.save(
                    MaintenancetaskContractor(
                        taskUuid = dto.taskUuid,
                        contractorUuid = contractorUuid,
                    ),
                )
            }
        }
    }

    fun getTasksByCorporate(coporateUuid: UUID): List<MaintenanceTaskResponseDto> =
        repository.findByCorporateUuid(coporateUuid).map {
            mapToResponseDto(it)
        }

    fun getTasksForContractor(contractorUuid: UUID): List<MaintenanceTaskResponseDto> {
        val contractorTasks = taskContractorRepository.findByContractorUuid(contractorUuid)
        val taskUuids = contractorTasks.filter { !it.quoteSubmitted }.map { it.taskUuid }
        return repository.findAllById(taskUuids).map { mapToResponseDto(it) }
    }

    fun submitQuote(quoteDto: QuoteCreateDto) {
        val id = MaintenancetaskContractorId(quoteDto.taskUuid, quoteDto.contractorUuid)
        val assignment =
            taskContractorRepository.findById(id).orElseThrow {
                IllegalStateException("Contractor not assigned to task: ${quoteDto.taskUuid}")
            }

        // save qoute
        val newQuote =
            quoteService.addQuote(
                t_uuid = quoteDto.taskUuid,
                c_uuid = quoteDto.contractorUuid,
                submitted_on = quoteDto.submittedOn ?: Date(System.currentTimeMillis()),
                status = quoteDto.status,
                amount = quoteDto.amount.toBigDecimal(),
                doc = quoteDto.documentUrl ?: "",
            )

        val updated =
            assignment.copy(
                quoteSubmitted = true,
                quoteUuid = newQuote.uuid!!,
            )

        taskContractorRepository.save(updated)
    }

    fun getContractorsForTask(taskUuid: UUID): List<MaintenancetaskContractor> = taskContractorRepository.findByTaskUuid(taskUuid)

    private fun mapToResponseDto(task: Maintenance): MaintenanceTaskResponseDto =
        MaintenanceTaskResponseDto(
            taskUuid = task.uuid!!,
            title = task.title,
            description = task.des,
            status = task.status,
            scheduledDate = task.scheduled_date?.toLocalDate(),
            approved = task.approved,
            approvalStatus = task.approvalStatus,
            buildingUuid = task.bUuid,
            createdByUuid = task.createdByUuid,
            imageUuid = task.img.toString(),
            trusteeUuid = task.tUuid,
            contractorUuid = task.cUuid,
        )
}
