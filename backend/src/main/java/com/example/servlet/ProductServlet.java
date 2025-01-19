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

@WebServlet("/api/products/*") // Updated to handle product-specific routes (e.g., /api/products/{id})
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

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            // Parse incoming JSON data
            req.setCharacterEncoding("UTF-8");
            resp.setContentType("application/json");
            Gson gson = new Gson();
            Product newProduct = gson.fromJson(req.getReader(), Product.class);

            // Validate the incoming data
            if (newProduct.getName() == null || newProduct.getName().isEmpty() ||
                newProduct.getPrice() <= 0 || newProduct.getCategory() == null || newProduct.getCategory().isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("Invalid product data: Ensure all fields are filled correctly.");
                return;
            }

            // Ensure unique ID assignment
            List<Product> productList = productService.getProducts();
            int maxId = productList.stream()
                                .mapToInt(Product::getId)
                                .max()
                                .orElse(0);
            newProduct.setId(maxId + 1); // Assign new unique ID

            // Add the product using ProductService
            productService.addProduct(newProduct);

            // Send success response
            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write(new Gson().toJson(newProduct));
        } catch (Exception e) {
            // Log the error and send appropriate response
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Failed to add product");
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            // Extract the product ID from the URL
            String pathInfo = req.getPathInfo(); // e.g., /{id}
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("Product ID is missing");
                return;
            }

            String idStr = pathInfo.substring(1); // Remove leading "/"
            int productId = Integer.parseInt(idStr);

            // Call ProductService to delete the product
            boolean isDeleted = productService.deleteProduct(productId);

            if (isDeleted) {
                resp.setStatus(HttpServletResponse.SC_OK);
                resp.getWriter().write("Product deleted successfully");
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write("Product not found");
            }
        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("Invalid product ID");
        } catch (Exception e) {
            // Log the error and send appropriate response
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Failed to delete product");
        }
    }
}
