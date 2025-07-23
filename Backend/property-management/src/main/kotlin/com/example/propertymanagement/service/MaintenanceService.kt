package com.example.propertymanagement.service

import com.example.propertymanagement.model.Maintenance
import com.example.propertymanagement.repository.MaintenanceRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Date
import java.util.NoSuchElementException
import java.util.UUID

@Service
class MaintenanceService(
    private val repository: MaintenanceRepository,
) {
    fun getAll(): List<Maintenance> = repository.findAll()

    fun add(item: Maintenance): Maintenance = repository.save(item)

    fun getByUuid(uuid: UUID): Maintenance =
        repository.findByUuid(uuid).orElseThrow { NoSuchElementException("Maintenance not found: $uuid") }

    fun getTasksByTrustee(tUuid: UUID): List<Maintenance> = repository.findAllBytUuid(tUuid)

    fun add(
        title: String,
        des: String,
        status: String,
        scheduled_date: java.sql.Date,
        approved: Boolean,
        bUuid: UUID,
        img: UUID,
        tUuid: UUID,
        cUuid: UUID,
    ): Maintenance {
        val newUser =
            Maintenance(
                title = title,
                des = des,
                status = status,
                scheduled_date = scheduled_date,
                approved = approved,
                bUuid = bUuid,
                img = img,
                tUuid = tUuid,
                cUuid = cUuid,
            )
        return add(newUser)
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
                img = newItem.img,
                tUuid = newItem.tUuid,
                cUuid = newItem.cUuid,
            )
        return repository.save(updated)
    }

    @Transactional
    fun deleteByUuid(uuid: UUID) = repository.deleteByUuid(uuid)

    fun delete(id: Int) = repository.deleteById(id)
}
