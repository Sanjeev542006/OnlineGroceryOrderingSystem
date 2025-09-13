package com.onlinegrocerysystem.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.entity.Product;
import com.onlinegrocerysystem.backend.entity.Vendor;
import com.onlinegrocerysystem.backend.repository.ProductRepo;
import com.onlinegrocerysystem.backend.repository.VendorRepo;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private VendorRepo vendorRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByPage(Pageable pageable) {
        return productRepository.findAll(pageable).getContent();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public void addProduct(Product product, Long vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId).orElseThrow(() -> new RuntimeException("Vendor not found"));
        product.setVendor(vendor);
        productRepository.save(product);
    }

    public List<Product> getProductsByVendor(Long vendorId) {
        return productRepository.findByVendorId(vendorId);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
