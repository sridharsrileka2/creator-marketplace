package com.creatormarketplace.backend.repository;

import com.creatormarketplace.backend.model.entity.Project;
import com.creatormarketplace.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByCreator(User creator);

    List<Project> findByJobClient(User client);

    Optional<Project> findByProjectIdAndCreator(
            Long projectId,
            User creator
    );
}