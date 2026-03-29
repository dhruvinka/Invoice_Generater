package com.example.InvoiceGenerater.service;
import com.example.InvoiceGenerater.entity.User;
import com.example.InvoiceGenerater.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;

    public User saveOrUpdateUser(User user) {
        log.info("Saving or updating user: {}", user.getClerkId());

        Optional<User> existingUserOpt = userRepo.findByClerkId(user.getClerkId());

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            log.info("Updating existing user with id: {}", existingUser.getId());

            // Update only non-null fields
            if (user.getEmail() != null)
                existingUser.setEmail(user.getEmail());

            if (user.getFirstname() != null)
                existingUser.setFirstname(user.getFirstname());

            if (user.getLastname() != null)
                existingUser.setLastname(user.getLastname());

            if (user.getPhotoUrl() != null)
                existingUser.setPhotoUrl(user.getPhotoUrl());

            return userRepo.save(existingUser);
        } else {
            log.info("Creating new user with clerkId: {}", user.getClerkId());
            user.setId(null); // ensure new insert
            if (user.getCreatedAt() == null) {
                user.setCreatedAt(Instant.now());
            }
            return userRepo.save(user);
        }
    }

    public void deleteUserByClerkId(String clerkId) {
        log.info("Deleting user with clerkId: {}", clerkId);
        Optional<User> existingUserOpt = userRepo.findByClerkId(clerkId);
        if (existingUserOpt.isPresent()) {
            userRepo.delete(existingUserOpt.get());
            log.info("User deleted successfully");
        } else {
            throw new RuntimeException("User not found with clerkId: " + clerkId);
        }
    }

    public User fetchUserByClerkId(String clerkId) {
        log.info("Fetching user with clerkId: {}", clerkId);
        return userRepo.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not Found with clerkId: " + clerkId));
    }
}