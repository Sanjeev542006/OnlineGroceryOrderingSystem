package com.onlinegrocerysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinegrocerysystem.backend.entity.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {
}
