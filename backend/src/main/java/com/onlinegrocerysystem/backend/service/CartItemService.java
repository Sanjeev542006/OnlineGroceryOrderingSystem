package com.onlinegrocerysystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.entity.CartItem;
import com.onlinegrocerysystem.backend.repository.CartItemRepo;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepo cartItemRepository;

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public CartItem getCartItemById(Long id) {
        return cartItemRepository.findById(id).orElse(null);
    }

    public void addCartItem(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }

    public void updateCartItem(Long id, CartItem cartItem) {
        if (cartItemRepository.existsById(id)) {
            cartItem.setId(id);
            cartItemRepository.save(cartItem);
        }
    }

    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }
}
