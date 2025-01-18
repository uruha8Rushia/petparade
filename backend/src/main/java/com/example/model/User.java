package com.example.model;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String username;
    private String password;
    private String email;
    private String role;
    private List<Integer> favourites; // List of product IDs the user marked as favourites

    // Default constructor
    public User() {
        this.favourites = new ArrayList<>(); // Initialize favourites to prevent null issues
    }

    // Parameterized constructor
    public User(String username, String password, String email, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.favourites = new ArrayList<>(); // Initialize favourites
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Integer> getFavourites() {
        return favourites;
    }

    public void setFavourites(List<Integer> favourites) {
        this.favourites = favourites;
    }

    public void addFavourite(int productId) {
        if (!favourites.contains(productId)) {
            favourites.add(productId);
        }
    }

    public void removeFavourite(int productId) {
        favourites.remove(Integer.valueOf(productId));
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", favourites=" + favourites +
                '}';
    }
}
