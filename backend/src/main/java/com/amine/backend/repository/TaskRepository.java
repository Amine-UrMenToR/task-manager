// src/main/java/com/amine/backend/repository/TaskRepository.java
package com.amine.backend.repository;

import com.amine.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // only pull tasks whose owner’s username matches
    List<Task> findByOwnerUsername(String username);
}
