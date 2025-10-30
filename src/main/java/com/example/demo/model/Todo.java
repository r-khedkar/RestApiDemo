package com.example.demo.model;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Todo entity representing a todo item.
 * 
 * @Data annotation generates getters, setters, toString, equals, and hashCode
 * @NoArgsConstructor generates a no-argument constructor
 * @AllArgsConstructor generates a constructor with all fields
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {

	@Id
	@GeneratedValue
	@Column(updatable = false, nullable = false)
	private Long id;

	@Column
	private String title;

	@Column
	private String description;

	@Column
	private TodoStatus todoStatus;

	@CreationTimestamp
	@Column(updatable = false)
	private Timestamp dateCreated;

	@UpdateTimestamp
	private Timestamp lastModified;
}
