package com.example.service;

import com.example.model.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ProductService {
    private static final String PRODUCT_FILE_PATH = "src/main/resources/products.json";
    private final ObjectMapper objectMapper;
    private List<Product> products;

    public ProductService() {
        this.objectMapper = new ObjectMapper();
        this.products = loadProducts();
    }

    public List<Product> getProducts() {
        return products;
    }

    public void addProduct(Product product) {
        products.add(product);
        saveProducts();
    }

    public void removeProduct(String productId) {
        products.removeIf(product -> product.getId().equals(productId));
        saveProducts();
    }

    private List<Product> loadProducts() {
        try {
            File file = new File(PRODUCT_FILE_PATH);
            if (file.exists()) {
                return objectMapper.readValue(file, new TypeReference<List<Product>>() {});
            } else {
                return new ArrayList<>();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void saveProducts() {
        try {
            objectMapper.writeValue(new File(PRODUCT_FILE_PATH), products);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}