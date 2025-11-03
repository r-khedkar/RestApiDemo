package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.User;

/**
 * Service interface for User management operations.
 * Defines the contract for user-related business logic.
 */
public interface UserService {
    
    /**
     * Retrieve all users from the database.
     * @return List of all users
     */
    List<User> getAllUsers();
    
    /**
     * Retrieve a user by their ID.
     * @param id the user ID
     * @return Optional containing the user if found
     */
    Optional<User> getUserById(Long id);
    
    /**
     * Retrieve a user by their username.
     * @param username the username
     * @return Optional containing the user if found
     */
    Optional<User> getUserByUsername(String username);
    
    /**
     * Retrieve a user by their email.
     * @param email the email
     * @return Optional containing the user if found
     */
    Optional<User> getUserByEmail(String email);
    
    /**
     * Create a new user.
     * @param user the user to create
     * @return the created user
     */
    User createUser(User user);
    
    /**
     * Update an existing user.
     * @param id the user ID to update
     * @param user the updated user data
     * @return the updated user
     */
    User updateUser(Long id, User user);
    
    /**
     * Delete a user by their ID.
     * @param id the user ID to delete
     */
    void deleteUser(Long id);
    
    /**
     * Check if a username already exists.
     * @param username the username to check
     * @return true if exists, false otherwise
     */
    boolean existsByUsername(String username);
    
    /**
     * Check if an email already exists.
     * @param email the email to check
     * @return true if exists, false otherwise
     */
    boolean existsByEmail(String email);
}
