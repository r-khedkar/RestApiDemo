package com.example.demo.controllers;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Todo;
import com.example.demo.services.TodoService;

/**
 * REST controller for managing Todo items.
 * Provides endpoints for CRUD operations on todos.
 */
@RestController
@RequestMapping("/api/v1/todo")
public class TodoController {
	private final TodoService todoService;

	public TodoController(TodoService todoService) {
		this.todoService = todoService;
	}

	/**
	 * Retrieves all todos.
	 * 
	 * @return ResponseEntity containing a list of all todos
	 */
	@GetMapping
	public ResponseEntity<List<Todo>> getAllTodos() {
		List<Todo> todos = todoService.getTodos();
		return new ResponseEntity<>(todos, HttpStatus.OK);
	}

	/**
	 * Retrieves a specific todo by its ID.
	 * 
	 * @param todoId the ID of the todo to retrieve
	 * @return ResponseEntity containing the todo
	 */
	@GetMapping({ "/{todoId}" })
	public ResponseEntity<Todo> getTodo(@PathVariable Long todoId) {
		return new ResponseEntity<>(todoService.getTodoById(todoId), HttpStatus.OK);
	}

	/**
	 * Creates a new todo.
	 * 
	 * @param todo the todo to create
	 * @return ResponseEntity containing the created todo with location header
	 */
	@org.springframework.web.bind.annotation.PostMapping
	public ResponseEntity<Todo> saveTodo(@RequestBody Todo todo) {
		Todo todo1 = todoService.insert(todo);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add("todo", "/api/v1/todo/" + todo1.getId().toString());
		return new ResponseEntity<>(todo1, httpHeaders, HttpStatus.CREATED);
	}

	/**
	 * Updates an existing todo.
	 * 
	 * @param todoId the ID of the todo to update
	 * @param todo the updated todo data
	 * @return ResponseEntity containing the updated todo
	 */
	@PutMapping({ "/{todoId}" })
	public ResponseEntity<Todo> updateTodo(@PathVariable("todoId") Long todoId, @RequestBody Todo todo) {
		todoService.updateTodo(todoId, todo);
		return new ResponseEntity<>(todoService.getTodoById(todoId), HttpStatus.OK);
	}

	/**
	 * Deletes a todo by its ID.
	 * 
	 * @param todoId the ID of the todo to delete
	 * @return ResponseEntity with NO_CONTENT status
	 */
	@DeleteMapping({ "/{todoId}" })
	public ResponseEntity<Todo> deleteTodo(@PathVariable("todoId") Long todoId) {
		todoService.deleteTodo(todoId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}