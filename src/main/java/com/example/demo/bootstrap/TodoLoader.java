package com.example.demo.bootstrap;

import org.springframework.stereotype.Component;

import com.example.demo.model.Todo;
import com.example.demo.model.TodoStatus;
import com.example.demo.repositories.TodoRepository;

import jakarta.annotation.PostConstruct;

/**
 * Component that loads sample todo data into the database on application startup.
 */
@Component
public class TodoLoader {
    private final TodoRepository todoRepository;

    public TodoLoader(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }
    
    @PostConstruct
    public void init(){
    	loadTodos();
    }

    private void loadTodos() {
        if (todoRepository.count() == 0) {
            todoRepository.save(new Todo("Complete project setup", "Set up the development environment and dependencies", TodoStatus.COMPLETED));
            todoRepository.save(new Todo("Write documentation", "Create comprehensive README and API documentation", TodoStatus.COMPLETED));
            todoRepository.save(new Todo("Implement unit tests", "Add unit tests for all service methods", TodoStatus.NOT_COMPLETED));
        }
    }
}
