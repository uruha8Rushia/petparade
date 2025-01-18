package com.example.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.example.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserService {
    private static final String USER_FILE_PATH = "users.json";
    private static final String ADMIN_USERNAME = "Admin";
    private static final String ADMIN_PASSWORD = "admin@123";
    private static final String ADMIN_ROLE = "admin";
    private final Map<String, User> users;
    private final ObjectMapper objectMapper;

    public UserService() {
        this.objectMapper = new ObjectMapper();
        this.users = loadUsers();
        ensureAdminUser();
    }

    // Register a new user
    public boolean register(User user) {
        if (users.containsKey(user.getUsername())) {
            return false; // User already exists
        }
        users.put(user.getUsername(), user);
        saveUsers();
        return true;
    }

    // User login
    public User login(String username, String password) {
        User user = users.get(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    // Add a product to user's favourites
    public boolean addFavourite(String username, int productId) {
        User user = users.get(username);
        if (user != null) {
            if (!user.getFavourites().contains(productId)) { // Avoid duplicate favourites
                user.addFavourite(productId);
                saveUsers();
                return true;
            }
        }
        return false; // User not found
    }

    // Remove a product from user's favourites
    public boolean removeFavourite(String username, int productId) {
        User user = users.get(username);
        if (user != null) {
            if (user.getFavourites().contains(productId)) { // Check if the favourite exists
                user.removeFavourite(productId);
                saveUsers();
                return true;
            }
        }
        return false; // User not found
    }

    // Get a user's favourite products
    public User getUserWithFavourites(String username) {
        return users.get(username); // Return user object, which includes favourites
    }

    // Load users from JSON file
    private Map<String, User> loadUsers() {
        try {
            File file = new File(USER_FILE_PATH);
            if (file.exists()) {
                return objectMapper.readValue(file,
                        objectMapper.getTypeFactory().constructMapType(HashMap.class, String.class, User.class));
            } else {
                return new HashMap<>();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new HashMap<>();
        }
    }

    // Save users to JSON file
    private void saveUsers() {
        try {
            objectMapper.writeValue(new File(USER_FILE_PATH), users);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Ensure admin user exists
    private void ensureAdminUser() {
        if (!users.containsKey(ADMIN_USERNAME)) {
            User admin = new User();
            admin.setUsername(ADMIN_USERNAME);
            admin.setPassword(ADMIN_PASSWORD);
            admin.setRole(ADMIN_ROLE);
            users.put(ADMIN_USERNAME, admin);
            saveUsers();
        }
    }
}
