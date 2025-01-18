package com.example.servlet;

import com.example.service.UserService;
import com.example.service.ProductService;
import com.example.model.Product;
import com.example.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/favourites")
public class UserFavouriteServlet extends HttpServlet {
    private UserService userService;
    private ProductService productService; // Added ProductService for product details
    private ObjectMapper objectMapper;

    @Override
    public void init() throws ServletException {
        this.userService = new UserService();
        this.productService = new ProductService(); // Initialize ProductService
        this.objectMapper = new ObjectMapper();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter("action");
        String username = req.getParameter("username");
        String productIdParam = req.getParameter("productId");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (username == null || productIdParam == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\": \"Username and productId are required\"}");
            return;
        }

        int productId;
        try {
            productId = Integer.parseInt(productIdParam);
        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\": \"Invalid productId format\"}");
            return;
        }

        boolean success;
        switch (action) {
            case "add":
                success = userService.addFavourite(username, productId);
                if (success) {
                    resp.getWriter().write("{\"message\": \"Product added to favourites\"}");
                } else {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"message\": \"Failed to add product to favourites\"}");
                }
                break;

            case "remove":
                success = userService.removeFavourite(username, productId);
                if (success) {
                    resp.getWriter().write("{\"message\": \"Product removed from favourites\"}");
                } else {
                    resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    resp.getWriter().write("{\"message\": \"Failed to remove product from favourites\"}");
                }
                break;

            default:
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"message\": \"Invalid action\"}");
                break;
        }

        // Log the operation for debugging purposes
        System.out.println("POST request: action=" + action + ", username=" + username + ", productId=" + productId);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (username == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\": \"Username is required\"}");
            return;
        }

        User user = userService.getUserWithFavourites(username);
        if (user == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\": \"User not found\"}");
            return;
        }

        List<Integer> favouriteIds = user.getFavourites();
        List<Product> favouriteProducts = productService.getProductsByIds(favouriteIds);

        if (favouriteProducts == null || favouriteProducts.isEmpty()) {
            resp.getWriter().write("[]"); // Return empty array if no favourites
            return;
        }

        String favouritesJson = objectMapper.writeValueAsString(favouriteProducts);
        resp.getWriter().write(favouritesJson);

        // Log the operation for debugging purposes
        System.out.println("GET request: username=" + username + ", favourites=" + favouritesJson);
    }
}
