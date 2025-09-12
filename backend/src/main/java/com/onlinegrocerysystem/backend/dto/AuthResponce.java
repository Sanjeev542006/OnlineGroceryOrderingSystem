package com.onlinegrocerysystem.backend.dto;

import lombok.Data;

@Data
public class AuthResponce {
    private String token;
    private String role;
    public AuthResponce(String token, String role) {
        this.token = token;
        this.role = role;
    }
}
