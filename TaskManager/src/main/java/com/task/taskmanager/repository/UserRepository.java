package com.task.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.taskmanager.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{

    User findByEmail(String email);
}