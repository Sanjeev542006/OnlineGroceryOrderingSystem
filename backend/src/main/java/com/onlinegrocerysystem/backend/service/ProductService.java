package com.onlinegrocerysystem.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.dto.ProductDto;
import com.onlinegrocerysystem.backend.entity.Product;
import com.onlinegrocerysystem.backend.entity.Vendor;
import com.onlinegrocerysystem.backend.repository.ProductRepo;
import com.onlinegrocerysystem.backend.repository.VendorRepo;
import java.util.stream.Collectors;

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

    public void addProduct(ProductDto productDto, Long vendorId) {
        try {
            System.out.println("Attempting to add product with vendor ID: " + vendorId);
            System.out.println("Product data: " + productDto.getName());
            
            Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found with ID: " + vendorId));
            
            System.out.println("Found vendor: " + vendor.getName());
            
            Product product = new Product();
            product.setName(productDto.getName());
            product.setDescription(productDto.getDescription());
            product.setCategory(productDto.getCategory());
            product.setPrice(productDto.getPrice());
            product.setStock(productDto.getStock());
            product.setImageUrl(productDto.getImageUrl());
            product.setVendor(vendor);
            
            Product savedProduct = productRepository.save(product);
            System.out.println("Product saved successfully with ID: " + savedProduct.getId());
        } catch (Exception e) {
            System.err.println("Error saving product: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public List<ProductDto> getAllProductsDto() {
        return productRepository.findAll().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setImageUrl(product.getImageUrl());
        return dto;
    }

    public List<Product> getProductsByVendor(Long vendorId) {
        return productRepository.findByVendorId(vendorId);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public void updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStock(updatedProduct.getStock());
        existingProduct.setImageUrl(updatedProduct.getImageUrl());
        
        productRepository.save(existingProduct);
    }
}
