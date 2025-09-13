package com.onlinegrocerysystem.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinegrocerysystem.backend.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByVendorId(Long vendorId);
}
