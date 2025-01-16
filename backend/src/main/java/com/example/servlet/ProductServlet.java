package com.example.servlet;

import com.example.model.Product;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/products")
public class ProductServlet extends HttpServlet {

    private List<Product> productList;

    @Override
    public void init() throws ServletException {
        // Initialize product list
        productList = new ArrayList<>();
        productList.add(new Product(1, "Cat Product 1", 44.85, "Sterilised Cat Food", "product1.jpg", "cat"));
        productList.add(new Product(2, "Cat Product 2", 96.85, "Fresh Market Cat Food", "product1.jpg", "cat"));
        productList.add(new Product(3, "Cat Product 3", 38.35, "Poppy Cat Food", "product1.jpg", "cat"));
        productList.add(new Product(4, "Cat Product 4", 38.35, "Poppy Cat Food", "product1.jpg", "cat"));

        productList.add(new Product(5, "Dog Product 1", 174.85, "Senior Dog Food", "product1.jpg", "dog"));
        productList.add(new Product(6, "Dog Product 2", 161.85, "Adult Dog Food", "product1.jpg", "dog"));
        productList.add(new Product(7, "Dog Product 3", 148.85, "Junior Dog Food", "product1.jpg", "dog"));
        productList.add(new Product(8, "Dog Product 4", 38.35, "Poppy Cat Food", "product1.jpg", "dog"));

        productList.add(new Product(9, "Small Pet Product 1", 19.99, "Healthy Small Pet Food", "product1.jpg", "small-pet"));
        productList.add(new Product(10, "Small Pet Product 2", 29.99, "Balanced Diet for Small Pets", "product1.jpg", "small-pet"));
        productList.add(new Product(11, "Small Pet Product 3", 38.35, "Poppy Cat Food", "product1.jpg", "small-pet"));
        productList.add(new Product(12, "Small Pet Product 4", 38.35, "Poppy Cat Food", "product1.jpg", "small-pet"));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            // Set response content type
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            // Convert product list to JSON using Gson
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(productList);

            // Write JSON response
            resp.getWriter().write(jsonResponse);
        } catch (Exception e) {
            // Log the error and send appropriate response
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Failed to load products");
        }
    }
}
