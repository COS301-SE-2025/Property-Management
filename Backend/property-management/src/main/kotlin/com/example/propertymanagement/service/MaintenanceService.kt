package com.example.propertymanagement.service

import com.example.propertymanagement.model.Maintenance
import com.example.propertymanagement.repository.MaintenanceRepository
import org.springframework.stereotype.Service
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

    fun add(
        title: String,
        des: String,
        status: String,
        scheduled_date: Date,
        created_by: Int,
        img: String,
        approved: Boolean,
        building_id: Int,
    ): Maintenance {
        val newUser =
            Maintenance(
                title = title,
                des = des,
                status = status,
                scheduled_date = scheduled_date,
                img = img,
                approved = approved,
                building_id = building_id,
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
                created_by = newItem.created_by,
                img = newItem.img,
                approved = newItem.approved,
                building_id = newItem.building_id,
            )
        return repository.save(updated)
    }

    fun deleteByUuid(uuid: UUID) = repository.deleteByUuid(uuid)

    fun delete(id: Int) = repository.deleteById(id)
}
