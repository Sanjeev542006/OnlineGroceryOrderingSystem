package com.onlinegrocerysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlinegrocerysystem.backend.entity.Vendor;

public interface VendorRepo extends JpaRepository<Vendor, Long> {
    Vendor findByUserId(Long userId);
    long countByStatus(Vendor.VendorStatus status);
}
