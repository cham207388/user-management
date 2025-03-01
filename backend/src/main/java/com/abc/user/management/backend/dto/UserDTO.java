package com.abc.user.management.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserDTO(
        Long id,

        @NotBlank(message = "Username is required")
        String username,

        @NotBlank(message = "Full name is required")
        String fullName,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email
) {}