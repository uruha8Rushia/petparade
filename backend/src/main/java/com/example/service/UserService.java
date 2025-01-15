package com.example.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.example.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserService {
    private static final String USER_FILE_PATH = "users.json";
    private Map<String, User> users;
    private ObjectMapper objectMapper;

    public UserService() {
        this.objectMapper = new ObjectMapper();
        this.users = loadUsers();
    }

    public boolean register(User user) {
        if (users.containsKey(user.getUsername())) {
            return false; // User already exists
        }
        users.put(user.getUsername(), user);
        saveUsers();
        return true;
    }

    public boolean login(String username, String password) {
        User user = users.get(username);
        return user != null && user.getPassword().equals(password);
    }

    private Map<String, User> loadUsers() {
        try {
            File file = new File(USER_FILE_PATH);
            if (file.exists()) {
                return objectMapper.readValue(file, objectMapper.getTypeFactory().constructMapType(HashMap.class, String.class, User.class));
            } else {
                return new HashMap<>();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new HashMap<>();
        }
    }

    private void saveUsers() {
        try {
            objectMapper.writeValue(new File(USER_FILE_PATH), users);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}