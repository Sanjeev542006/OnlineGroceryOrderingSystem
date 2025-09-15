package com.onlinegrocerysystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.dto.OrderDto;
import com.onlinegrocerysystem.backend.entity.Order;
import com.onlinegrocerysystem.backend.entity.Order.OrderStatus;
import com.onlinegrocerysystem.backend.entity.OrderItem;
import com.onlinegrocerysystem.backend.entity.Product;
import com.onlinegrocerysystem.backend.entity.User;
import com.onlinegrocerysystem.backend.repository.OrderRepo;
import com.onlinegrocerysystem.backend.repository.ProductRepo;
import com.onlinegrocerysystem.backend.repository.UserRepo;
import java.util.ArrayList;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ProductRepo productRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public void placeOrder(OrderDto orderDto) {
        User customer = userRepository.findById(orderDto.getCustomerId())
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        Order order = new Order();
        order.setCustomer(customer);
        order.setTotalPrice(orderDto.getTotalAmount());
        order.setOrderDate(orderDto.getOrderDate());
        order.setStatus(OrderStatus.PENDING);
        order.setOrderItems(new ArrayList<>());
        
        // Save order first to get ID
        Order savedOrder = orderRepository.save(order);
        
        // Create order items
        if (orderDto.getItems() != null) {
            for (OrderDto.OrderItemDto itemDto : orderDto.getItems()) {
                Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
                
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setProduct(product);
                orderItem.setQuantity(itemDto.getQuantity());
                orderItem.setPrice(itemDto.getPrice());
                
                savedOrder.getOrderItems().add(orderItem);
            }
            
            // Save order with items
            orderRepository.save(savedOrder);
        }
    }

    public void updateStatus(Long id, String status) {
        Order order = getOrderById(id);
        if (order != null) {
            order.setStatus(Enum.valueOf(OrderStatus.class, status.toUpperCase()));
            orderRepository.save(order);
        }
    }

    public List<Order> getOrdersByVendor(Long vendorId) {
        // For now, return all orders since we need to implement proper vendor-order relationship
        // In a real implementation, you'd filter orders by vendor through order items
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
