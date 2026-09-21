package com.creatormarketplace.backend.repository;

import com.creatormarketplace.backend.model.entity.Job;
import com.creatormarketplace.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByClient(User client);

    List<Job> findByStatus(String status);
}