package com.task.taskmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task.taskmanager.entity.Task;
import com.task.taskmanager.repository.TaskRepository;

@Service
public class TaskService {

    @Autowired
    TaskRepository repo;

    public Task saveTask(Task task) {
        return repo.save(task);
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public void deleteTask(int id) {
        repo.deleteById(id);
    }
}