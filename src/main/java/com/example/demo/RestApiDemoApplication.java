package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for the RestApiDemo application.
 * This is a Spring Boot application that provides a REST API for managing todos.
 */
@SpringBootApplication
public class RestApiDemoApplication {

	/**
	 * Main method to start the Spring Boot application.
	 * @param args command line arguments
	 */
	public static void main(String[] args) {
		SpringApplication.run(RestApiDemoApplication.class, args);
	}

}
