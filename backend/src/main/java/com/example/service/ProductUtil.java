package com.example.service;

import com.example.model.Product;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.util.List;

public class ProductUtil {
    private static final String PRODUCT_FILE = "products.json";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static List<Product> loadProducts() {
        try {
            return objectMapper.readValue(new File(PRODUCT_FILE), new TypeReference<List<Product>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void saveProducts(List<Product> products) {
        try {
            objectMapper.writeValue(new File(PRODUCT_FILE), products);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

