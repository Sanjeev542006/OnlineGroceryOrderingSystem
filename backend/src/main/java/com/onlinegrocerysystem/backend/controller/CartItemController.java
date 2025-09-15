package com.onlinegrocerysystem.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.onlinegrocerysystem.backend.entity.CartItem;
import com.onlinegrocerysystem.backend.service.CartItemService;

@RestController
@RequestMapping("/cartItems")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }

    @GetMapping("/{id}")
    public CartItem getCartItemById(@PathVariable Long id) {
        return cartItemService.getCartItemById(id);
    }

    @PostMapping("/add")
    public String addCartItem(@RequestBody CartItem cartItem) {
        cartItemService.addCartItem(cartItem);
        return "Cart item added successfully";
    }

    @PutMapping("/update/{id}")
    public String updateCartItem(@PathVariable Long id, @RequestBody CartItem cartItem) {
        cartItemService.updateCartItem(id, cartItem);
        return "Cart item updated successfully";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
        return "Cart item deleted successfully";
    }
}
