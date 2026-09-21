package com.creatormarketplace.backend.service;

import com.creatormarketplace.backend.model.entity.CreatorProfile;
import com.creatormarketplace.backend.model.entity.User;
import com.creatormarketplace.backend.repository.CreatorProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class CreatorProfileService {

    private final CreatorProfileRepository creatorProfileRepository;

    public CreatorProfileService(
            CreatorProfileRepository creatorProfileRepository) {
        this.creatorProfileRepository = creatorProfileRepository;
    }

    public CreatorProfile createProfile(CreatorProfile profile) {

        User user = profile.getUser();

        if (creatorProfileRepository.existsByUser(user)) {
            throw new RuntimeException("Creator profile already exists");
        }

        return creatorProfileRepository.save(profile);
    }

    public CreatorProfile getProfile(User user) {

        return creatorProfileRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Creator profile not found"));
    }

    public CreatorProfile updateProfile(
            User user,
            CreatorProfile updatedProfile) {

        CreatorProfile existingProfile = creatorProfileRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Creator profile not found"));

        existingProfile.setBio(updatedProfile.getBio());
        existingProfile.setSkills(updatedProfile.getSkills());
        existingProfile.setPortfolioUrl(updatedProfile.getPortfolioUrl());
        existingProfile.setProfileImageUrl(
                updatedProfile.getProfileImageUrl()
        );

        return creatorProfileRepository.save(existingProfile);
    }

    public void deleteProfile(User user) {

        CreatorProfile existingProfile = creatorProfileRepository
                .findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Creator profile not found"));

        creatorProfileRepository.delete(existingProfile);
    }
}