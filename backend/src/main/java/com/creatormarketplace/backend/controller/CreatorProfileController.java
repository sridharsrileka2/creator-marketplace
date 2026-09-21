package com.creatormarketplace.backend.controller;

import com.creatormarketplace.backend.model.entity.CreatorProfile;
import com.creatormarketplace.backend.model.entity.User;
import com.creatormarketplace.backend.repository.UserRepository;
import com.creatormarketplace.backend.service.CreatorProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/creator-profiles")
public class CreatorProfileController {

    private final CreatorProfileService creatorProfileService;
    private final UserRepository userRepository;

    public CreatorProfileController(
            CreatorProfileService creatorProfileService,
            UserRepository userRepository) {

        this.creatorProfileService = creatorProfileService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<CreatorProfile> createProfile(
            @RequestBody CreatorProfile profile,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        profile.setUser(user);

        CreatorProfile savedProfile =
                creatorProfileService.createProfile(profile);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProfile);
    }

    @GetMapping
    public ResponseEntity<CreatorProfile> getProfile(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        CreatorProfile profile =
                creatorProfileService.getProfile(user);

        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<CreatorProfile> updateProfile(
            @RequestBody CreatorProfile updatedProfile,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        CreatorProfile profile =
                creatorProfileService.updateProfile(
                        user,
                        updatedProfile
                );

        return ResponseEntity.ok(profile);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteProfile(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        creatorProfileService.deleteProfile(user);

        return ResponseEntity.ok(
                "Creator profile deleted successfully"
        );
    }
}