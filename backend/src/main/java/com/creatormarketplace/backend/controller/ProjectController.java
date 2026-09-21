package com.creatormarketplace.backend.controller;

import com.creatormarketplace.backend.model.entity.Project;
import com.creatormarketplace.backend.model.entity.User;
import com.creatormarketplace.backend.repository.UserRepository;
import com.creatormarketplace.backend.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final UserRepository userRepository;

    public ProjectController(
            ProjectService projectService,
            UserRepository userRepository) {

        this.projectService = projectService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestBody Project project,
            Authentication authentication) {

        String email = authentication.getName();

        User creator = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        project.setCreator(creator);

        Project savedProject =
                projectService.createProject(project);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProject);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Project>> getMyProjects(
            Authentication authentication) {

        String email = authentication.getName();

        User creator = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return ResponseEntity.ok(
                projectService.getMyProjects(creator)
        );
    }

    @GetMapping("/client")
    public ResponseEntity<List<Project>> getClientProjects(
            Authentication authentication) {

        String email = authentication.getName();

        User client = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return ResponseEntity.ok(
                projectService.getClientProjects(client)
        );
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProject(
            @PathVariable Long projectId,
            Authentication authentication) {

        String email = authentication.getName();

        User creator = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return ResponseEntity.ok(
                projectService.getProject(projectId, creator)
        );
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long projectId,
            @RequestBody Project updatedProject,
            Authentication authentication) {

        String email = authentication.getName();

        User creator = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Project project = projectService.updateProject(
                projectId,
                creator,
                updatedProject
        );

        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<String> deleteProject(
            @PathVariable Long projectId,
            Authentication authentication) {

        String email = authentication.getName();

        User creator = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        projectService.deleteProject(projectId, creator);

        return ResponseEntity.ok(
                "Project deleted successfully"
        );
    }
}