package com.example.propertymanagement.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.web.SecurityFilterChain

@Profile("!integration")
@Configuration
class SecurityConfig {
    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { }
            .authorizeHttpRequests {
                it
                    .requestMatchers("/api/buildings/**", "/api/contractor/**")
                    .authenticated()
                    .anyRequest()
                    .permitAll()
            }.httpBasic { }
        return http.build()
    }
}
