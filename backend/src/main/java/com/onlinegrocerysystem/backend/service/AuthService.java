package com.onlinegrocerysystem.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.dto.AuthResponce;
import com.onlinegrocerysystem.backend.dto.LoginRequest;
import com.onlinegrocerysystem.backend.dto.RegisterRequest;
import com.onlinegrocerysystem.backend.entity.Role;
import com.onlinegrocerysystem.backend.entity.User;
import com.onlinegrocerysystem.backend.repository.UserRepo;
import com.onlinegrocerysystem.backend.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // 🔹 Register user
    public String register(RegisterRequest req) {
        if (userRepository.findByEmail(req.getEmail()) != null) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword())); // hash password
        user.setRole(req.getRole() == null ? Role.CUSTOMER : Role.valueOf(req.getRole()));
        user.setAddress(req.getAddress()); // ✅ fixed

        userRepository.save(user);
        return "User registered successfully";
    }

    // 🔹 Login user
    public AuthResponce login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail());
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user);
        return  new AuthResponce(token, user.getRole().name());
    }
}
