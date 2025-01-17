package com.example.servlet;

import com.example.model.Product;
import com.example.service.ProductService;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/products")
public class ProductServlet extends HttpServlet {

    private ProductService productService;

    @Override
    public void init() throws ServletException {
        // Initialize ProductService
        productService = new ProductService();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            // Set response content type
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");

            // Fetch product list from ProductService
            List<Product> productList = productService.getProducts();

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
