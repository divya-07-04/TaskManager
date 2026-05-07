package com.task.taskmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.task.taskmanager.entity.User;
import com.task.taskmanager.service.UserService;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService service;

    @PostMapping("/signup")
    public User signup(@RequestBody User user){

        return service.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user){

        return service.login(
                user.getEmail(),
                user.getPassword()
        );
    }
}