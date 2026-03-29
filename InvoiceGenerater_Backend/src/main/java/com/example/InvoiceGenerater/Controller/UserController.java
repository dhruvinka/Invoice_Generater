package com.example.InvoiceGenerater.Controller;

import com.example.InvoiceGenerater.entity.User;
import com.example.InvoiceGenerater.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> saveOrUpdateUser(@RequestBody User user, Authentication authentication) {
        log.info("User sync request received for clerkId: {}", user.getClerkId());
        log.info("Authentication present: {}", authentication != null);

        try {
            if (authentication != null && authentication.getName() != null) {
                String authenticatedUserId = authentication.getName();
                log.info("Authenticated user: {}", authenticatedUserId);

                if (!authenticatedUserId.equals(user.getClerkId())) {
                    Map<String, String> error = new HashMap<>();
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
                }
            }

            // Save or update user
            User savedUser = userService.saveOrUpdateUser(user);
            log.info("User saved successfully: {}", savedUser.getClerkId());



            return ResponseEntity.ok(savedUser);

        } catch (Exception e) {
            log.error("Error saving user: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An error occurred while saving the user: " + e.getMessage()));
        }
    }

    @GetMapping("/{clerkId}")
    public ResponseEntity<?> getUserByClerkId(@PathVariable String clerkId, Authentication authentication) {
        try {

            if (authentication != null && !authentication.getName().equals(clerkId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized to view this user");
            }

            User user = userService.fetchUserByClerkId(clerkId);
            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{clerkId}")
    public ResponseEntity<?> deleteUser(@PathVariable String clerkId, Authentication authentication) {
        try {
            // Only allow users to delete their own account
            if (authentication == null || !authentication.getName().equals(clerkId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized to delete this user");
            }

            userService.deleteUserByClerkId(clerkId);
            return ResponseEntity.ok().body(Map.of("message", "User deleted successfully"));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}