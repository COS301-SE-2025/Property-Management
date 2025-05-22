package com.example.propertymanagement.repository

import com.example.propertymanagement.model.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long>
