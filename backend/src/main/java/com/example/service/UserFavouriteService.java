package com.example.service;

import com.example.model.User;

public class UserFavouriteService {
    private final UserService userService; // Use UserService to manage users

    public UserFavouriteService() {
        this.userService = new UserService(); // Initialize UserService
    }

    // Add a product to user's favourites
    public boolean addFavourite(String username, int productId) {
        return userService.addFavourite(username, productId); // Delegate to UserService
    }

    // Remove a product from user's favourites
    public boolean removeFavourite(String username, int productId) {
        return userService.removeFavourite(username, productId); // Delegate to UserService
    }

    // Get a user's favourite products
    public User getUserWithFavourites(String username) {
        return userService.getUserWithFavourites(username); // Delegate to UserService
    }
}
