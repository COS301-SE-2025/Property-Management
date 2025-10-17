package com.example.propertymanagement.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Configuration
class CorsConfig {
    
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        
        // Add allowed origins
        configuration.allowedOrigins = listOf(
            "http://localhost:4200",
            "http://localhost:8100",
            "http://localhost:9876",
            "http://localhost:8080",
            "https://localhost",
            "https://staging.d19cit456z7grf.amplifyapp.com",
            "https://property-management.live",
            "https://www.property-management.live"
        )
        
        // Use patterns for subdomains (requires Spring 5.3+)
        configuration.allowedOriginPatterns = listOf(
            "http://localhost:*",
            "https://*.property-management.live",
            "https://*.amplifyapp.com"
        )
        
        // Allow all HTTP methods including PATCH
        configuration.allowedMethods = listOf(
            "GET", 
            "POST", 
            "PUT", 
            "DELETE", 
            "PATCH", 
            "OPTIONS",
            "HEAD"
        )
        
        // Allow all headers
        configuration.allowedHeaders = listOf("*")
        
        // Expose headers that client can access
        configuration.exposedHeaders = listOf(
            "Authorization",
            "Content-Type",
            "X-Requested-With"
        )
        
        // Allow credentials (cookies, authorization headers)
        configuration.allowCredentials = true
        
        // How long the response from a pre-flight request can be cached
        configuration.maxAge = 3600L
        
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        
        return source
    }
    
    @Bean
    fun corsFilter(): CorsFilter {
        return CorsFilter(corsConfigurationSource())
    }
}