package com.task.taskmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.task.taskmanager.entity.Task;
import com.task.taskmanager.service.TaskService;

@RestController
@CrossOrigin("*")
public class TaskController {

    @Autowired
    TaskService service;

    @GetMapping("/")
    public String home() {
        return "Backend Working";
    }

    @PostMapping("/add")
    public Task addTask(@RequestBody Task task) {
        return service.saveTask(task);
    }

    @GetMapping("/tasks")
    public List<Task> getTasks() {
        return service.getAllTasks();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTask(@PathVariable int id) {
        service.deleteTask(id);
        return "Task Deleted";
    }
}