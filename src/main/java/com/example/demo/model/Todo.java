package com.example.demo.model;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import com.example.demo.model.TodoStatus;

@Entity
@Data
public class Todo {

	public Todo() {
		super();
	}

	@Id
	@GeneratedValue
	@Column(updatable = false, nullable = false)
	Long id;

	@Column
	String title;

	@Column
	String description;

	@Column
	TodoStatus todoStatus;

	@CreationTimestamp
	@Column(updatable = false)
	Timestamp dateCreated;

	@UpdateTimestamp
	Timestamp lastModified;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public TodoStatus getTodoStatus() {
		return todoStatus;
	}

	public void setTodoStatus(TodoStatus todoStatus) {
		this.todoStatus = todoStatus;
	}

	public Timestamp getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Timestamp dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Timestamp getLastModified() {
		return lastModified;
	}

	public void setLastModified(Timestamp lastModified) {
		this.lastModified = lastModified;
	}

	public Todo(Long id, String title, String description, TodoStatus todoStatus, Timestamp dateCreated,
			Timestamp lastModified) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.todoStatus = todoStatus;
		this.dateCreated = dateCreated;
		this.lastModified = lastModified;
	}

}
