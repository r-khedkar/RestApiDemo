package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Todo;

/**
 * Repository interface for Todo entity.
 * Provides CRUD operations through Spring Data JPA.
 */
@Repository
public interface TodoRepository extends CrudRepository<Todo, Long> {
}

