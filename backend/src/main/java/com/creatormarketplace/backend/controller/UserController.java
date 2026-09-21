package com.creatormarketplace.backend.controller;

import com.creatormarketplace.backend.model.dto.LoginRequest;
import com.creatormarketplace.backend.model.dto.UserResponseDTO;
import com.creatormarketplace.backend.model.entity.User;
import com.creatormarketplace.backend.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(
            @RequestBody User user) {

        User savedUser = userService.registerUser(user);

        UserResponseDTO response = new UserResponseDTO(savedUser);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(
            @RequestBody LoginRequest loginRequest) {

        String token = userService.loginUser(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        return ResponseEntity.ok(token);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody LoginRequest request) {

        userService.resetPassword(
                request.getEmail(),
                request.getPassword()
        );

        return ResponseEntity.ok("Password updated successfully");
    }

    @GetMapping("/profile")
    public ResponseEntity<String> getProfile() {

        return ResponseEntity.ok(
                "You are authenticated and can access the profile."
        );
    }
}