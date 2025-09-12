package com.onlinegrocerysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinegrocerysystem.backend.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {
}
