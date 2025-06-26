package com.example.propertymanagement.exception

import jakarta.validation.ConstraintViolationException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.HttpRequestMethodNotSupportedException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(ConstraintViolationException::class)
    fun handleConstraintViolation(ex: ConstraintViolationException): ResponseEntity<Map<String, String>> =
        ResponseEntity(mapOf("error" to "Invalid parameter: ${ex.message}"), HttpStatus.BAD_REQUEST)

    @ExceptionHandler(RestException::class)
    fun handleApiException(ex: RestException): ResponseEntity<Map<String, String>> =
        ResponseEntity.status(ex.statusCode).body(mapOf("error" to (ex.reason ?: "An error occurred")))

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidation(ex: MethodArgumentNotValidException): ResponseEntity<Map<String, String>> =
        ResponseEntity(
            mapOf("error" to "Validation error: ${ex.bindingResult.fieldErrors.map { it.defaultMessage }}"),
            HttpStatus.BAD_REQUEST,
        )

    @ExceptionHandler(MethodArgumentTypeMismatchException::class)
    fun handleTypeMismatch(ex: MethodArgumentTypeMismatchException): ResponseEntity<Map<String, String>> =
        ResponseEntity(mapOf("error" to "Invalid parameter: ${ex.value}"), HttpStatus.BAD_REQUEST)

    @ExceptionHandler(HttpRequestMethodNotSupportedException::class)
    fun handleMethodNotSupported(ex: HttpRequestMethodNotSupportedException): ResponseEntity<Map<String, String>> =
        ResponseEntity(mapOf("error" to "Method not allowed"), HttpStatus.METHOD_NOT_ALLOWED)

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleNotReadable(ex: HttpMessageNotReadableException): ResponseEntity<Map<String, String>> =
        ResponseEntity(mapOf("error" to "Malformed JSON request"), HttpStatus.BAD_REQUEST)

    @ExceptionHandler(Exception::class)
    fun handleGenericException(ex: Exception): ResponseEntity<Map<String, String>> =
        ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(mapOf("error" to (ex.message ?: "An unexpected error occurred")))

    @ExceptionHandler(NoSuchElementException::class)
    fun handleNotFound(ex: NoSuchElementException): ResponseEntity<Map<String, String>> =
        ResponseEntity(mapOf("error" to (ex.message ?: "Not found")), HttpStatus.NOT_FOUND)
}
