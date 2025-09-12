package com.onlinegrocerysystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.entity.Cart;
import com.onlinegrocerysystem.backend.repository.CartRepo;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepository;

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Cart getCartById(Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    public Cart getCartByUser(Long userId) {
        return cartRepository.findByCustomerId(userId);
    }

    public void createCart(Cart cart) {
        cartRepository.save(cart);
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }
}
