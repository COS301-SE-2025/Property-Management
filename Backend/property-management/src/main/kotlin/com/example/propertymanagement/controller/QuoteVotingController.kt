package com.example.propertymanagement.controller

import com.example.propertymanagement.dto.CreateVoteSessionRequest
import com.example.propertymanagement.dto.SubmitVoteRequest
import com.example.propertymanagement.dto.VoteSessionResult
import com.example.propertymanagement.dto.VoteSessionSummary
import com.example.propertymanagement.service.QuoteVotingService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/api/vote")
class QuoteVotingController(
    private val votingService: QuoteVotingService,
) {
    @PostMapping("/session")
    fun createSession(
        @RequestBody request: CreateVoteSessionRequest,
    ): ResponseEntity<Map<String, UUID>> {
        val session = votingService.createSession(request)
        return ResponseEntity.status(201).body(mapOf("sessionUuid" to session.sessionUuid))
    }

    @PostMapping
    fun vote(
        @RequestBody request: SubmitVoteRequest,
    ): ResponseEntity<String> {
        votingService.vote(request)
        return ResponseEntity.ok("Vote submitted successfully")
    }

    @GetMapping("/session/{uuid}/results")
    fun getResults(
        @PathVariable uuid: UUID,
    ): ResponseEntity<VoteSessionResult> = ResponseEntity.ok(votingService.getResults(uuid))

    @GetMapping("/sessions")
    fun getAllSessions(): ResponseEntity<List<VoteSessionSummary>> = ResponseEntity.ok(votingService.getAllSessions())

    @GetMapping("/session/{uuid}/task")
    fun getTaskId(
        @PathVariable uuid: UUID,
    ): ResponseEntity<Map<String, UUID>> = ResponseEntity.ok(mapOf("taskUuid" to votingService.getTaskId(uuid)))

    @GetMapping("/task/{taskUuid}/session")
    fun getSessionByTask(
        @PathVariable taskUuid: UUID,
    ): ResponseEntity<VoteSessionSummary?> {
        val session = votingService.getSessionByTask(taskUuid)
        return if (session != null) {
            ResponseEntity.ok(session)
        } else {
            ResponseEntity.ok(null)
        }
    }
}
