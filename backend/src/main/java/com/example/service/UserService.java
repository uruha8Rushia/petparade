package com.example.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
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

    public boolean register(User user) {
        if (users.containsKey(user.getUsername())) {
            return false; // User already exists
        }
        if (user.getFavourites() == null) {
            user.setFavourites(new ArrayList<>()); // Ensure favourites is initialized
        }
        users.put(user.getUsername(), user);
        saveUsers();
        return true;
    }

    public User login(String username, String password) {
        User user = users.get(username);
        if (user != null && user.getPassword().equals(password)) {
            if (user.getFavourites() == null) {
                user.setFavourites(new ArrayList<>()); // Ensure favourites is initialized on login
            }
            return user;
        }
        return null;
    }

    public boolean addFavourite(String username, int productId) {
        User user = users.get(username);
        if (user != null) {
            if (!user.getFavourites().contains(productId)) {
                user.addFavourite(productId);
                saveUsers();
                return true;
            }
        }
        return false; // User not found
    }

    public boolean removeFavourite(String username, int productId) {
        User user = users.get(username);
        if (user != null) {
            if (user.getFavourites().contains(productId)) {
                user.removeFavourite(productId);
                saveUsers();
                return true;
            }
        }
        return false; // User not found
    }

    public User getUser(String username) {
        User user = users.get(username);
        if (user != null && user.getFavourites() == null) {
            user.setFavourites(new ArrayList<>()); // Ensure favourites is initialized when fetching user
        }
        return user;
    }

    public User getUserWithFavourites(String username) {
        return getUser(username);
    }

    private Map<String, User> loadUsers() {
        try {
            File file = new File(USER_FILE_PATH);
            if (file.exists()) {
                Map<String, User> loadedUsers = objectMapper.readValue(file,
                        objectMapper.getTypeFactory().constructMapType(HashMap.class, String.class, User.class));
                loadedUsers.values().forEach(user -> {
                    if (user.getFavourites() == null) {
                        user.setFavourites(new ArrayList<>()); // Ensure favourites is initialized during load
                    }
                });
                return loadedUsers;
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

    private void ensureAdminUser() {
        if (!users.containsKey(ADMIN_USERNAME)) {
            User admin = new User();
            admin.setUsername(ADMIN_USERNAME);
            admin.setPassword(ADMIN_PASSWORD);
            admin.setRole(ADMIN_ROLE);
            admin.setFavourites(new ArrayList<>()); // Initialize favourites
            users.put(ADMIN_USERNAME, admin);
            saveUsers();
        }
    }
}
