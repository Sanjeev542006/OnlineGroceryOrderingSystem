package com.onlinegrocerysystem.backend.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private String category;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;
}