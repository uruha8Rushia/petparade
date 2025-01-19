package com.example.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.example.model.Product;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ProductService {
    private static final String PRODUCT_FILE_PATH = "src/main/resources/products.json"; // Ensure this path exists
    private final ObjectMapper objectMapper;
    private List<Product> products;

    public ProductService() {
        this.objectMapper = new ObjectMapper();
        this.products = loadProducts();
    }

    public List<Product> getProducts() {
        if (products == null || products.isEmpty()) {
            products = loadProducts(); // Reload in case the list is empty
        }
        return products;
    }

    public void addProduct(Product product) {
        products.add(product);
        saveProducts();
    }

    public void updateProduct(Product updatedProduct) {
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId() == updatedProduct.getId()) {
                products.set(i, updatedProduct);
                break;
            }
        }
        saveProducts();
    }

    public void removeProduct(int productId) {
        products.removeIf(product -> product.getId() == productId);
        saveProducts();
    }

    private List<Product> loadProducts() {
        try {
            File file = new File(PRODUCT_FILE_PATH);
            if (file.exists()) {
                return objectMapper.readValue(file, new TypeReference<List<Product>>() {});
            } else {
                return new ArrayList<>(); // Return an empty list if the file doesn't exist
            }
        } catch (IOException e) {
            System.err.println("Error loading products: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    private void saveProducts() {
        try {
            objectMapper.writeValue(new File(PRODUCT_FILE_PATH), products);
        } catch (IOException e) {
            System.err.println("Error saving products: " + e.getMessage());
        }
    }

    public List<Product> getProductsByIds(List<Integer> ids) {
        return products.stream()
                .filter(product -> ids.contains(product.getId()))
                .collect(Collectors.toList());
    }
}