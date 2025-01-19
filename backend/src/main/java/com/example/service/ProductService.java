package com.example.service;

import com.example.model.Product;
import com.example.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ProductService {
    private static final String USER_FILE_PATH = "users.json"; // Path to users.json
    private final ObjectMapper objectMapper;

    public ProductService() {
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Retrieves all products by delegating to ProductUtil.
     * @return List of products
     */
    public List<Product> getProducts() {
        return ProductUtil.loadProducts(); // Always load fresh products from ProductUtil
    }

    /**
     * Adds a product to the list and saves it using ProductUtil.
     * @param product The product to be added
     */
    public void addProduct(Product product) {
        List<Product> productList = ProductUtil.loadProducts();
    
        // Add the new product
        productList.add(product);
    
        // Save updated product list
        ProductUtil.saveProducts(productList);
    
        System.out.println("Product added: " + product);
    }
    

    /**
     * Deletes a product by its ID and ensures the deletion is reflected in the JSON file,
     * and removes the product from all users' favorite lists.
     * @param productId The ID of the product to delete
     * @return true if the product is successfully deleted, false otherwise
     */
    public boolean deleteProduct(int productId) {
        List<Product> productList = ProductUtil.loadProducts(); // Load products from ProductUtil
        Product productToDelete = productList.stream()
            .filter(product -> product.getId() == productId)
            .findFirst()
            .orElse(null);

        if (productToDelete != null) {
            productList.remove(productToDelete);
            ProductUtil.saveProducts(productList); // Save updated product list to JSON
            System.out.println("Product deleted: " + productToDelete);

            // Remove the product from all user favourites
            removeProductFromUserFavorites(productId);

            return true;
        }
        System.err.println("Failed to delete product with ID: " + productId);
        return false;
    }

    /**
     * Removes the product ID from all users' favorite lists.
     * @param productId The ID of the product to remove from favorites
     */
    public void removeProductFromUserFavorites(int productId) {
        try {
            File userFile = new File(USER_FILE_PATH);
            if (!userFile.exists()) {
                System.err.println("Users file not found. Skipping favorite removal.");
                return;
            }

            // Load users from JSON (map of username -> user details)
            Map<String, User> userMap = objectMapper.readValue(userFile, new TypeReference<Map<String, User>>() {});

            // Iterate through the users and remove the productId from their favourites
            userMap.values().forEach(user -> {
                if (user.getFavourites() != null) {
                    user.removeFavourite(productId);
                }
            });

            // Save updated users back to JSON
            objectMapper.writeValue(userFile, userMap);
            System.out.println("Product ID " + productId + " removed from all user favorites.");
        } catch (IOException e) {
            System.err.println("Error updating user favourites: " + e.getMessage());
        }
    }

    /**
     * Retrieves a list of products by their IDs.
     * @param ids List of product IDs to retrieve
     * @return List of products matching the given IDs
     */
    public List<Product> getProductsByIds(List<Integer> ids) {
        List<Product> productList = ProductUtil.loadProducts();
        return productList.stream()
                .filter(product -> ids.contains(product.getId()))
                .collect(Collectors.toList());
    }
}
