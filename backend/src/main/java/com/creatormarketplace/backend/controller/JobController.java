package com.creatormarketplace.backend.controller;

import com.creatormarketplace.backend.model.dto.JobResponseDTO;
import com.creatormarketplace.backend.model.entity.Job;
import com.creatormarketplace.backend.model.entity.User;
import com.creatormarketplace.backend.repository.UserRepository;
import com.creatormarketplace.backend.service.JobService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
    private final UserRepository userRepository;

    public JobController(JobService jobService, UserRepository userRepository) {
        this.jobService = jobService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<JobResponseDTO> createJob(
            @RequestBody Job job,
            Authentication authentication) {

        String email = authentication.getName();

        User client = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        job.setClient(client);

        Job savedJob = jobService.createJob(job);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new JobResponseDTO(savedJob));
    }

    @GetMapping("/my")
    public ResponseEntity<List<JobResponseDTO>> getMyJobs(
            Authentication authentication) {

        String email = authentication.getName();

        User client = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<JobResponseDTO> response = jobService.getMyJobs(client)
                .stream()
                .map(JobResponseDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/open")
    public ResponseEntity<List<JobResponseDTO>> getOpenJobs() {

        List<JobResponseDTO> response = jobService.getOpenJobs()
                .stream()
                .map(JobResponseDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<JobResponseDTO> updateJob(
            @PathVariable Long jobId,
            @RequestBody Job updatedJob,
            Authentication authentication) {

        String email = authentication.getName();

        User client = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobService.updateJob(client, jobId, updatedJob);

        return ResponseEntity.ok(new JobResponseDTO(job));
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long jobId,
            Authentication authentication) {

        String email = authentication.getName();

        User client = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        jobService.deleteJob(client, jobId);

        return ResponseEntity.ok("Job deleted successfully");
    }
}