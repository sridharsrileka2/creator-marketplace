package com.creatormarketplace.backend.model.dto;

import com.creatormarketplace.backend.model.entity.User;

public class UserResponseDTO {

    private Long userId;
    private String name;
    private String email;
    private String role;

    public UserResponseDTO(User user) {
        this.userId = user.getUserId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole().name();
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}