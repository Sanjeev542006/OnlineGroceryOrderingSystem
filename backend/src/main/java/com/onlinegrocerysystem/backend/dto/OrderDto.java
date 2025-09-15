package com.onlinegrocerysystem.backend.dto;

import java.util.List;
import lombok.Data;

@Data
public class OrderDto {
    private Long customerId;
    private String orderDate;
    private String status;
    private Double totalAmount;
    private List<OrderItemDto> items;
    
    @Data
    public static class OrderItemDto {
        private Long productId;
        private Integer quantity;
        private Double price;
    }
}