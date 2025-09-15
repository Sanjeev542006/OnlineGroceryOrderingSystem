package com.onlinegrocerysystem.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinegrocerysystem.backend.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        return dashboardService.getDashboardStats();
    }

    @GetMapping("/vendor/{vendorId}")
    public Map<String, Object> getVendorDashboardStats(@PathVariable Long vendorId) {
        return dashboardService.getVendorDashboardStats(vendorId);
    }
}