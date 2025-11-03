package com.example.demo.bootstrap;

import org.springframework.stereotype.Component;

import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;

import jakarta.annotation.PostConstruct;

/**
 * Bootstrap component to load initial user data into the database.
 * Runs automatically on application startup.
 */
@Component
public class UserLoader {
    
    private final UserRepository userRepository;

    public UserLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @PostConstruct
    public void init() {
        System.out.println("************ UserLoader init() Method called");
        loadUsers();
    }

    private void loadUsers() {
        System.out.println("************ Loading initial user data");
        if (userRepository.count() == 0) {
            User user1 = new User(
                "john_doe",
                "john.doe@example.com",
                "password123",
                "John",
                "Doe"
            );
            
            User user2 = new User(
                "jane_smith",
                "jane.smith@example.com",
                "password456",
                "Jane",
                "Smith"
            );
            
            User user3 = new User(
                "bob_johnson",
                "bob.johnson@example.com",
                "password789",
                "Bob",
                "Johnson"
            );
            
            userRepository.save(user1);
            userRepository.save(user2);
            userRepository.save(user3);
            
            System.out.println("************ Loaded " + userRepository.count() + " users");
        } else {
            System.out.println("************ Users already exist in database");
        }
    }
}
