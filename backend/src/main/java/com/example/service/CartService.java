package com.example.service;

import com.example.model.Cart;
import com.example.model.Product;

public class CartService {
    private final Cart cart;

    public CartService() {
        this.cart = new Cart();
    }

    public void addProduct(Product product) {
        cart.addProduct(product);
    }

    public void removeProduct(Product product) {
        cart.removeProduct(product);
    }

    public Cart getCart() {
        return cart;
    }
}