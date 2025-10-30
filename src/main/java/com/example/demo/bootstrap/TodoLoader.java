package com.example.demo.bootstrap;

import java.sql.Timestamp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.model.Todo;
import com.example.demo.model.TodoStatus;
import com.example.demo.repositories.TodoRepository;

import jakarta.annotation.PostConstruct;

@Component
public class TodoLoader {
    public final TodoRepository todoRepository;

    public TodoLoader(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }
    
    @PostConstruct
    public void init(){
    	loadTodos();
    }

    private void loadTodos() {
        if (todoRepository.count() == 0) {
			todoRepository.save(new Todo(1L, "Title 1", "Description", TodoStatus.COMPLETED,
					new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis())));
            todoRepository.save(new Todo(2L, "Title 2", "Description", TodoStatus.COMPLETED,
					new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis())));
            todoRepository.save(new Todo(3L, "Title 3", "Description", TodoStatus.COMPLETED,
					new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis())));
        }
    }
}
