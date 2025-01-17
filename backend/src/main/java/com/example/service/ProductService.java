package com.example.service;

import com.example.model.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ProductService {
    private static final String PRODUCT_FILE_PATH = "products.json"; // Ensure this path exists
    private final ObjectMapper objectMapper;
    private List<Product> products;

    public ProductService() {
        this.objectMapper = new ObjectMapper();
        this.products = loadProducts();
    }

    /**
     * Retrieves all products.
     * @return List of products
     */
    public List<Product> getProducts() {
        if (products == null || products.isEmpty()) {
            products = loadProducts(); // Reload in case the list is empty
        }
        return products;
    }

    /**
     * Adds a product to the list and saves it to the JSON file.
     * @param product The product to be added
     */
    public void addProduct(Product product) {
        products.add(product);
        saveProducts();
    }

    /**
     * Removes a product based on its ID.
     * @param productId The ID of the product to remove
     */
    public void removeProduct(String productId) {
        products.removeIf(product -> String.valueOf(product.getId()).equals(productId));
        saveProducts();
    }

    /**
     * Loads products from the JSON file.
     * @return List of products
     */
    private List<Product> loadProducts() {
        try {
            File file = new File(PRODUCT_FILE_PATH);
            if (file.exists()) {
                // Load and parse the JSON file into a list of products
                return objectMapper.readValue(file, new TypeReference<List<Product>>() {});
            } else {
                return new ArrayList<>(); // Return an empty list if the file doesn't exist
            }
        } catch (IOException e) {
            System.err.println("Error loading products: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Saves the current list of products to the JSON file.
     */
    private void saveProducts() {
        try {
            objectMapper.writeValue(new File(PRODUCT_FILE_PATH), products);
        } catch (IOException e) {
            System.err.println("Error saving products: " + e.getMessage());
        }
    }
}
