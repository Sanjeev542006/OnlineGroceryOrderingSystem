package com.onlinegrocerysystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.entity.Order;
import com.onlinegrocerysystem.backend.entity.Order.OrderStatus;
import com.onlinegrocerysystem.backend.repository.OrderRepo;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public void placeOrder(Order order) {
        orderRepository.save(order);
    }

    public void updateStatus(Long id, String status) {
        Order order = getOrderById(id);
        if (order != null) {
            order.setStatus(Enum.valueOf(OrderStatus.class, status.toUpperCase()));
            orderRepository.save(order);
        }
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
