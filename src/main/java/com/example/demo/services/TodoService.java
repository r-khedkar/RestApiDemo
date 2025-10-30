package com.example.demo.services;

import java.util.List;

import com.example.demo.model.Todo;

/**
 * Service interface for managing Todo operations.
 */
public interface TodoService {
    /**
     * Retrieves all todos.
     * @return list of all todos
     */
    List<Todo> getTodos();

    /**
     * Retrieves a todo by its ID.
     * @param id the todo ID
     * @return the todo
     * @throws RuntimeException if todo not found
     */
    Todo getTodoById(Long id);

    /**
     * Creates a new todo.
     * @param todo the todo to create
     * @return the created todo
     */
    Todo insert(Todo todo);

    /**
     * Updates an existing todo.
     * @param id the todo ID
     * @param todo the updated todo data
     * @throws RuntimeException if todo not found
     */
    void updateTodo(Long id, Todo todo);

    /**
     * Deletes a todo by its ID.
     * @param todoId the todo ID
     */
    void deleteTodo(Long todoId);
}