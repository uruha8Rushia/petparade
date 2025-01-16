package com.example.servlet;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.model.Product;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/api/products")
public class ProductServlet extends HttpServlet {
    private List<Product> products; // Assume this is initialized with your product data
    private ObjectMapper objectMapper;

    @Override
    public void init() throws ServletException {
        this.objectMapper = new ObjectMapper();
        // Initialize your product list here
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String query = req.getParameter("query");
        List<Product> result = products;

        if (query != null && !query.isEmpty()) {
            result = products.stream()
                    .filter(product -> product.getName().toLowerCase().contains(query.toLowerCase()))
                    .collect(Collectors.toList());
        }

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(objectMapper.writeValueAsString(result));
    }
}