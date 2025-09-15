package com.onlinegrocerysystem.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinegrocerysystem.backend.dto.ProductDto;
import com.onlinegrocerysystem.backend.entity.Product;
import com.onlinegrocerysystem.backend.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductDto> getAllProducts() {
        return productService.getAllProductsDto();
    }

    @GetMapping("/paging")
    public List<Product> getProductsByPage(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return productService.getProductsByPage(pageable);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping("/addProduct")
    public String addProduct(@RequestBody ProductDto productDto, @RequestParam Long vendorId) {
        try {
            productService.addProduct(productDto, vendorId);
            return "Product added successfully";
        } catch (Exception e) {
            throw new RuntimeException("Failed to add product: " + e.getMessage());
        }
    }

    @GetMapping("/vendor/{vendorId}")
    public List<Product> getProductsByVendor(@PathVariable Long vendorId) {
        return productService.getProductsByVendor(vendorId);
    }

    @DeleteMapping("/deleteProduct/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }

    @PutMapping("/updateProduct/{id}")
    public String updateProduct(@PathVariable Long id, @RequestBody Product product) {
        productService.updateProduct(id, product);
        return "Product updated successfully";
    }
}
