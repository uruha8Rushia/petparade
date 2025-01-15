package com.example.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.model.User;
import com.example.service.UserService;

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

    private void handleRegister(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String email = req.getParameter("email");
        String role = req.getParameter("role"); // Get role from request

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
}