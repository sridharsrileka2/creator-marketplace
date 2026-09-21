package com.creatormarketplace.backend.model.dto;

import com.creatormarketplace.backend.model.entity.Job;
import com.creatormarketplace.backend.model.entity.User;

public class JobResponseDTO {

    private Long jobId;
    private Long clientId;
    private String clientName;
    private String clientEmail;
    private String title;
    private String description;
    private String requiredSkills;
    private Double budget;
    private String deadline;
    private String status;
    private String createdAt;

    public JobResponseDTO(Job job) {

        this.jobId = job.getJobId();

        User client = job.getClient();

        if (client != null) {
            this.clientId = client.getUserId();
            this.clientName = client.getName();
            this.clientEmail = client.getEmail();
        }

        this.title = job.getTitle();
        this.description = job.getDescription();
        this.requiredSkills = job.getRequiredSkills();
        this.budget = job.getBudget();

        if (job.getDeadline() != null) {
            this.deadline = job.getDeadline().toString();
        }

        this.status = job.getStatus();

        if (job.getCreatedAt() != null) {
            this.createdAt = job.getCreatedAt().toString();
        }
    }

    public Long getJobId() {
        return jobId;
    }

    public Long getClientId() {
        return clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getRequiredSkills() {
        return requiredSkills;
    }

    public Double getBudget() {
        return budget;
    }

    public String getDeadline() {
        return deadline;
    }

    public String getStatus() {
        return status;
    }

    public String getCreatedAt() {
        return createdAt;
    }
}