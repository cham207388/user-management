package com.abc.user.management.backend.service;

import com.abc.user.management.backend.dto.UserDTO;
import com.abc.user.management.backend.entity.User;
import com.abc.user.management.backend.exception.UserNotFoundException;
import com.abc.user.management.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = new User(null, userDTO.username(), userDTO.email(), userDTO.fullName());
        user = userRepository.save(user);
        return new UserDTO(user.getId(), user.getUsername(), user.getFullName(), user.getEmail());
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return new UserDTO(user.getId(), user.getUsername(), user.getFullName(), user.getEmail());
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getFullName(), user.getEmail()))
                .toList();
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setUsername(userDTO.username());
        user.setFullName(userDTO.fullName());
        user.setEmail(userDTO.email());

        user = userRepository.save(user);
        return new UserDTO(user.getId(), user.getUsername(), user.getFullName(), user.getEmail());
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }
}