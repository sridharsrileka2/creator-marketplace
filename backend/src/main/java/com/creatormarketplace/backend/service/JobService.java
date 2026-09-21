package com.creatormarketplace.backend.service;

import com.creatormarketplace.backend.model.entity.Job;
import com.creatormarketplace.backend.model.entity.User;
import com.creatormarketplace.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getMyJobs(User client) {
        return jobRepository.findByClient(client);
    }

    public List<Job> getOpenJobs() {
        return jobRepository.findByStatus("OPEN");
    }

    public Job updateJob(User client, Long jobId, Job updatedJob) {

        Job existingJob = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (!existingJob.getClient().getUserId()
                .equals(client.getUserId())) {

            throw new RuntimeException(
                    "You are not allowed to update this job");
        }

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setRequiredSkills(updatedJob.getRequiredSkills());
        existingJob.setBudget(updatedJob.getBudget());
        existingJob.setDeadline(updatedJob.getDeadline());
        existingJob.setStatus(updatedJob.getStatus());

        return jobRepository.save(existingJob);
    }

    public void deleteJob(User client, Long jobId) {

        Job existingJob = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (!existingJob.getClient().getUserId()
                .equals(client.getUserId())) {

            throw new RuntimeException(
                    "You are not allowed to delete this job");
        }

        jobRepository.delete(existingJob);
    }
}