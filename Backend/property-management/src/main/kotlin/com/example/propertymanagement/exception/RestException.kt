package com.example.propertymanagement.exception

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class RestException(status: HttpStatus, message: String) : ResponseStatusException(status, message)