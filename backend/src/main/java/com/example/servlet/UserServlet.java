package com.example.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.model.User;
import com.example.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/api/user")
public class UserServlet extends HttpServlet {
    private UserService userService;

    @Override
    public void init() throws ServletException {
        this.userService = new UserService();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = req.getParameter("action");
        if ("register".equals(action)) {
            handleRegister(req, resp);
        } else if ("login".equals(action)) {
            handleLogin(req, resp);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (username == null || username.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\": \"Username is required\"}");
            return;
        }

        User user = userService.getUser(username);

        if (user != null) {
            // Build JSON response
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writeValueAsString(user);
            resp.getWriter().write(jsonResponse);
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"message\": \"User not found\"}");
        }
    }

    private void handleRegister(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String email = req.getParameter("email");
        String role = req.getParameter("role"); // Get role from request

        // Check for null or empty fields
        if (username == null || username.isEmpty() || 
            password == null || password.isEmpty() || 
            email == null || email.isEmpty()) {
            resp.setContentType("application/json");
            resp.setCharacterEncoding("UTF-8");
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\": \"All fields are required\"}");
            return;
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setRole(role);

        boolean success = userService.register(user);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        if (success) {
            resp.getWriter().write("{\"message\": \"User registered successfully\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_CONFLICT);
            resp.getWriter().write("{\"message\": \"Username already exists\"}");
        }
    }

    private void handleLogin(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        User user = userService.login(username, password);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        if (user != null) {
            resp.getWriter().write("{\"message\": \"Login successful\", \"role\": \"" + user.getRole() + "\"}");
        } else {
            resp.getWriter().write("{\"message\": \"Invalid username or password\"}");
        }
    }

    private void handleUserProfile(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username = req.getParameter("username");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (username == null || username.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write("{\"message\": \"Username is required\"}");
            return;
        }

        User user = userService.getUser(username);

        if (user != null) {
            // Build JSON response
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writeValueAsString(user);
            resp.getWriter().write(jsonResponse);
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write("{\"message\": \"User not found\"}");
        }
    }
}
