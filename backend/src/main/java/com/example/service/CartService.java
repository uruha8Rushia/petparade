package com.example.service;

import com.example.model.Cart;
import com.example.model.Product;

public class CartService {
    private final Cart cart;

    public CartService() {
        // Initialize the cart instance
        this.cart = new Cart();
    }

    /**
     * Adds a product to the cart. If the product already exists, its quantity is increased.
     *
     * @param product The product to add.
     */
    public void addProduct(Product product) {
        if (product != null) {
            cart.addProduct(product);
        } else {
            System.err.println("Cannot add a null product to the cart.");
        }
    }

    /**
     * Removes a product from the cart. If the product does not exist in the cart, it does nothing.
     *
     * @param product The product to remove.
     */
    public void removeProduct(Product product) {
        if (product != null) {
            cart.removeProduct(product);
        } else {
            System.err.println("Cannot remove a null product from the cart.");
        }
    }

    /**
     * Retrieves the cart instance containing the current list of products.
     *
     * @return The cart.
     */
    public Cart getCart() {
        return cart;
    }
}
