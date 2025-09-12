package com.onlinegrocerysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinegrocerysystem.backend.entity.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
}
