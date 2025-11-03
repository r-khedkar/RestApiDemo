package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;

/**
 * Implementation of UserService interface.
 * Provides business logic for user management operations.
 */
@Service
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User createUser(User user) {
        // Validate unique constraints before saving
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists: " + user.getUsername());
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + user.getEmail());
        }
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
        
        // Update only non-null fields
        if (user.getUsername() != null && !user.getUsername().equals(existingUser.getUsername())) {
            if (userRepository.existsByUsername(user.getUsername())) {
                throw new IllegalArgumentException("Username already exists: " + user.getUsername());
            }
            existingUser.setUsername(user.getUsername());
        }
        
        if (user.getEmail() != null && !user.getEmail().equals(existingUser.getEmail())) {
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new IllegalArgumentException("Email already exists: " + user.getEmail());
            }
            existingUser.setEmail(user.getEmail());
        }
        
        if (user.getPassword() != null) {
            existingUser.setPassword(user.getPassword());
        }
        
        if (user.getFirstName() != null) {
            existingUser.setFirstName(user.getFirstName());
        }
        
        if (user.getLastName() != null) {
            existingUser.setLastName(user.getLastName());
        }
        
        if (user.getActive() != null) {
            existingUser.setActive(user.getActive());
        }
        
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
