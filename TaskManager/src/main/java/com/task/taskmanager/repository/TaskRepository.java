package com.task.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.taskmanager.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

}