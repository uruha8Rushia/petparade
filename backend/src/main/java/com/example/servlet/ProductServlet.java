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
        productList.add(new Product(2, "Dog Product 1", 161.85, "Adult Dog Food", "product2.jpg", "dog"));
        productList.add(new Product(3, "Small Pet Product 1", 19.99, "Healthy Small Pet Food", "product3.jpg", "small-pet"));
        productList.add(new Product(4, "Cat Product 2", 96.85, "Fresh Market Cat Food", "product4.jpg", "cat"));
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            // Set response content type
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
    
            // Convert product list to JSON
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(productList);
    
            // Write JSON response
            resp.getWriter().write(jsonResponse);
        } catch (Exception e) {
            // Log the error
            e.printStackTrace();
            // Send error response
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Failed to load products");
        }
    }
}
