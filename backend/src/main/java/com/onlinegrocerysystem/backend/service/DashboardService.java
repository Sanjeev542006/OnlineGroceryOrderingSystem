package com.onlinegrocerysystem.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.entity.Vendor;
import com.onlinegrocerysystem.backend.repository.OrderRepo;
import com.onlinegrocerysystem.backend.repository.ProductRepo;
import com.onlinegrocerysystem.backend.repository.UserRepo;
import com.onlinegrocerysystem.backend.repository.VendorRepo;

@Service
public class DashboardService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private VendorRepo vendorRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private OrderRepo orderRepo;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Basic counts
        long totalUsers = userRepo.count();
        long totalVendors = vendorRepo.count();
        long approvedVendors = vendorRepo.countByStatus(Vendor.VendorStatus.APPROVED);
        long pendingVendors = vendorRepo.countByStatus(Vendor.VendorStatus.PENDING);
        long totalProducts = productRepo.count();
        long totalOrders = orderRepo.count();
        
        stats.put("totalUsers", totalUsers);
        stats.put("totalVendors", totalVendors);
        stats.put("approvedVendors", approvedVendors);
        stats.put("pendingVendors", pendingVendors);
        stats.put("totalProducts", totalProducts);
        stats.put("totalOrders", totalOrders);
        
        // Mock growth data for now
        stats.put("userGrowth", 12.5);
        stats.put("vendorGrowth", 8.3);
        stats.put("orderGrowth", 15.2);
        stats.put("revenueGrowth", 18.7);
        
        // Mock additional data
        stats.put("dailyActiveUsers", Math.max(1, totalUsers / 3));
        stats.put("newRegistrationsToday", 5);
        stats.put("vendorApplicationsToday", 2);
        stats.put("platformRevenue", 45000.0);
        stats.put("systemUptime", 99.8);
        stats.put("averageResponseTime", 120);
        
        return stats;
    }

    public Map<String, Object> getVendorDashboardStats(Long vendorId) {
        Map<String, Object> stats = new HashMap<>();
        
        // Get vendor's product count
        long totalProducts = productRepo.countByVendorId(vendorId);
        
        // Mock data for now - in real implementation you'd calculate from orders
        stats.put("totalRevenue", 15000.0);
        stats.put("totalOrders", 150);
        stats.put("totalProducts", totalProducts);
        stats.put("averageOrderValue", 100.0);
        stats.put("revenueGrowth", 12.5);
        stats.put("orderGrowth", 8.3);
        stats.put("revenueThisMonth", 3500.0);
        stats.put("ordersThisMonth", 35);
        
        // Order status breakdown (mock data)
        Map<String, Integer> ordersByStatus = new HashMap<>();
        ordersByStatus.put("pending", 5);
        ordersByStatus.put("processing", 8);
        ordersByStatus.put("shipped", 12);
        ordersByStatus.put("delivered", 125);
        stats.put("ordersByStatus", ordersByStatus);
        
        return stats;
    }
}