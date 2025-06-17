package com.example.propertymanagement.exception

import jakarta.validation.ConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {
    
    @ExceptionHandler(ConstraintViolationException::class)
    fun handleConstraintViolation(ex: ConstraintViolationException): ResponseEntity<String> =
        ResponseEntity("Invalid parameter: ${ex.message}", HttpStatus.BAD_REQUEST)
    
    @ExceptionHandler(RestException::class)
    fun handleApiException(ex: RestException): ResponseEntity<String> {
        return ResponseEntity.status(ex.statusCode).body(ex.reason ?: "An error occurred")
    }
}