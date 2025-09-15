package com.onlinegrocerysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinegrocerysystem.backend.entity.Cart;

public interface CartRepo extends JpaRepository<Cart, Long> {
    Cart findByCustomerId(Long customerId);
}