package com.onlinegrocerysystem.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlinegrocerysystem.backend.entity.Vendor;
import com.onlinegrocerysystem.backend.service.VendorService;

@RestController
@RequestMapping("/vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @GetMapping
    public List<Vendor> getAllVendors() {
        System.out.println("Getting all vendors...");
        List<Vendor> vendorList = vendorService.getAllVendors();
        System.out.println("Found " + vendorList.size() + " vendors");
        return vendorList;
    }

    @GetMapping("/{id}")
    public Vendor getVendorById(@PathVariable Long id) {
        return vendorService.getVendorById(id);
    }

    @GetMapping("/user/{email}")
    public Vendor getVendorByUserEmail(@PathVariable String email) {
        return vendorService.getVendorByUserEmail(email);
    }

    @PostMapping("/addVendor")
    public String addVendor(@RequestBody Vendor vendor) {
        vendorService.addVendor(vendor);
        return "Vendor added successfully";
    }

    @PatchMapping("/{id}/approve")
    public String approveVendor(@PathVariable Long id) {
        vendorService.updateVendorStatus(id, Vendor.VendorStatus.APPROVED);
        return "Vendor approved successfully";
    }

    @PatchMapping("/{id}/reject")
    public String rejectVendor(@PathVariable Long id) {
        vendorService.updateVendorStatus(id, Vendor.VendorStatus.REJECTED);
        return "Vendor rejected successfully";
    }

    @PatchMapping("/{id}/suspend")
    public String suspendVendor(@PathVariable Long id) {
        vendorService.updateVendorStatus(id, Vendor.VendorStatus.SUSPENDED);
        return "Vendor suspended successfully";
    }

    @DeleteMapping("/deleteVendor/{id}")
    public String deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return "Vendor deleted successfully";
    }
}
