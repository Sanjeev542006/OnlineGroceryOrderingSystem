package com.onlinegrocerysystem.backend.config;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.onlinegrocerysystem.backend.entity.Product;
import com.onlinegrocerysystem.backend.entity.Role;
import com.onlinegrocerysystem.backend.entity.User;
import com.onlinegrocerysystem.backend.entity.Vendor;
import com.onlinegrocerysystem.backend.repository.ProductRepo;
import com.onlinegrocerysystem.backend.repository.UserRepo;
import com.onlinegrocerysystem.backend.repository.VendorRepo;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepo userRepository;
    
    @Autowired
    private VendorRepo vendorRepository;
    
    @Autowired
    private ProductRepo productRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Create vendor user
        User vendorUser = new User();
        vendorUser.setName("Demo Vendor");
        vendorUser.setEmail("vendor@grocery.com");
        vendorUser.setPassword(passwordEncoder.encode("password"));
        vendorUser.setRole(Role.VENDOR);
        vendorUser.setAddress("123 Vendor Street");
        User savedVendorUser = userRepository.save(vendorUser);

        // Create vendor
        Vendor vendor = new Vendor();
        vendor.setUser(savedVendorUser);
        vendor.setName("Demo Vendor Store");
        Vendor savedVendor = vendorRepository.save(vendor);

        // Create products
        List<Object[]> productData = Arrays.asList(
            // new Object[]{"Fresh Apples", "Crisp red apples", "4.99", 50, "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"},
            // new Object[]{"Organic Bananas", "Sweet organic bananas", "2.99", 75, "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400"},
            // new Object[]{"Fresh Milk", "Whole milk 1 gallon", "3.49", 30, "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"},
            // new Object[]{"Bread Loaf", "Whole wheat bread", "2.79", 25, "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"},
            // new Object[]{"Chicken Breast", "Fresh chicken breast", "8.99", 20, "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400"},
            // new Object[]{"Tomatoes", "Fresh red tomatoes", "3.99", 40, "https://images.unsplash.com/photo-1546470427-e5ac89cd0b31?w=400"},
            // new Object[]{"Lettuce", "Fresh green lettuce", "1.99", 35, "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400"},
            // new Object[]{"Orange Juice", "Fresh orange juice", "4.49", 15, "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400"},
            // new Object[]{"Pasta", "Italian pasta", "1.99", 60, "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400"},
            // new Object[]{"Rice", "Basmati rice 5lb", "6.99", 25, "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"},
            // new Object[]{"Eggs", "Farm fresh eggs dozen", "3.99", 45, "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400"},
            // new Object[]{"Cheese", "Cheddar cheese block", "5.99", 20, "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400"},
            // new Object[]{"Yogurt", "Greek yogurt", "4.99", 30, "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"},
            // new Object[]{"Carrots", "Fresh carrots", "2.49", 55, "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400"},
            // new Object[]{"Potatoes", "Russet potatoes 5lb", "3.99", 40, "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400"},
            // new Object[]{"Onions", "Yellow onions", "2.99", 50, "https://images.unsplash.com/photo-1508747703725-719777637510?w=400"},
            // new Object[]{"Bell Peppers", "Mixed bell peppers", "4.99", 25, "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400"},
            // new Object[]{"Salmon", "Fresh salmon fillet", "12.99", 15, "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400"},
            // new Object[]{"Ground Beef", "Lean ground beef", "7.99", 18, "https://images.unsplash.com/photo-1588347818133-38c4106c7d8d?w=400"},
            // new Object[]{"Cereal", "Breakfast cereal", "4.49", 35, "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400"}
        );

        for (Object[] data : productData) {
            Product product = new Product();
            product.setName((String) data[0]);
            product.setDescription((String) data[1]);
            product.setPrice(new BigDecimal((String) data[2]));
            product.setStock((Integer) data[3]);
            product.setImageUrl((String) data[4]);
            product.setVendor(savedVendor);
            productRepository.save(product);
        }
    }
}