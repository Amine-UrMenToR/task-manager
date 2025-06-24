// src/main/java/com/amine/backend/controller/TaskController.java
package com.amine.backend.controller;

import com.amine.backend.model.Task;
import com.amine.backend.model.User;
import com.amine.backend.repository.TaskRepository;
import com.amine.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired private TaskRepository taskRepository;
    @Autowired private UserRepository userRepository;

    @GetMapping
    public List<Task> getAllTasks(Principal principal) {
        return taskRepository.findByOwnerUsername(principal.getName());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(
            @Valid @RequestBody Task task,
            Principal principal
    ) {
        User me = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "User not found"));

        task.setOwner(me);
        Task saved = taskRepository.save(task);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody Task taskDetails,
            Principal principal
    ) {
        Optional<Task> maybe = taskRepository.findById(id);
        if (maybe.isEmpty()) {
            // explicitly return a ResponseEntity<Task>
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .<Task>build();
        }

        Task task = maybe.get();
        if (!task.getOwner().getUsername().equals(principal.getName())) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .<Task>build();
        }

        // apply updates
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setDueDate(taskDetails.getDueDate());
        task.setPriority(taskDetails.getPriority());
        task.setStatus(taskDetails.getStatus());

        Task updated = taskRepository.save(task);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id,
            Principal principal
    ) {
        Optional<Task> maybe = taskRepository.findById(id);
        if (maybe.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .<Void>build();
        }

        Task task = maybe.get();
        if (!task.getOwner().getUsername().equals(principal.getName())) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .<Void>build();
        }

        taskRepository.delete(task);
        return ResponseEntity.ok().<Void>build();
    }
}
