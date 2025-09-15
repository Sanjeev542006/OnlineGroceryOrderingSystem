package com.onlinegrocerysystem.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinegrocerysystem.backend.entity.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);
}
