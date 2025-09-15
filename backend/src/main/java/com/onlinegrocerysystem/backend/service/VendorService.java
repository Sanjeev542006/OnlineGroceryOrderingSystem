package com.onlinegrocerysystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.entity.User;
import com.onlinegrocerysystem.backend.entity.Vendor;
import com.onlinegrocerysystem.backend.repository.UserRepo;
import com.onlinegrocerysystem.backend.repository.VendorRepo;

@Service
public class VendorService {

    @Autowired
    private VendorRepo vendorRepository;

    @Autowired
    private UserRepo userRepository;

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public Vendor getVendorById(Long id) {
        return vendorRepository.findById(id).orElse(null);
    }

    public void addVendor(Vendor vendor) {
        vendorRepository.save(vendor);
    }

    public void updateVendorStatus(Long id, Vendor.VendorStatus status) {
        Vendor vendor = vendorRepository.findById(id).orElse(null);
        if (vendor != null) {
            vendor.setStatus(status);
            vendorRepository.save(vendor);
        }
    }

    public void deleteVendor(Long id) {
        vendorRepository.deleteById(id);
    }

    public Vendor getVendorByUserEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) return null;
        return vendorRepository.findByUserId(user.getId());
    }
}
