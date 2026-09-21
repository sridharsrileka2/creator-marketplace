package com.creatormarketplace.backend.service;

import com.creatormarketplace.backend.model.entity.Project;
import com.creatormarketplace.backend.model.entity.User;
import com.creatormarketplace.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getMyProjects(User creator) {
        return projectRepository.findByCreator(creator);
    }

    public List<Project> getClientProjects(User client) {
        return projectRepository.findByJobClient(client);
    }

    public Project getProject(Long projectId, User creator) {
        return projectRepository
                .findByProjectIdAndCreator(projectId, creator)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));
    }

    public Project updateProject(
            Long projectId,
            User creator,
            Project updatedProject) {

        Project existingProject = projectRepository
                .findByProjectIdAndCreator(projectId, creator)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        existingProject.setTitle(updatedProject.getTitle());
        existingProject.setDescription(updatedProject.getDescription());
        existingProject.setAgreedBudget(updatedProject.getAgreedBudget());
        existingProject.setStatus(updatedProject.getStatus());
        existingProject.setCompletedAt(updatedProject.getCompletedAt());

        return projectRepository.save(existingProject);
    }

    public void deleteProject(Long projectId, User creator) {

        Project existingProject = projectRepository
                .findByProjectIdAndCreator(projectId, creator)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        projectRepository.delete(existingProject);
    }
}