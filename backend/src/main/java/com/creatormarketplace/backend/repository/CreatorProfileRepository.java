package com.creatormarketplace.backend.repository;

import com.creatormarketplace.backend.model.entity.CreatorProfile;
import com.creatormarketplace.backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CreatorProfileRepository
        extends JpaRepository<CreatorProfile, Long> {

    Optional<CreatorProfile> findByUser(User user);

    boolean existsByUser(User user);
}