package com.onlinegrocerysystem.backend.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.onlinegrocerysystem.backend.entity.User;
import com.onlinegrocerysystem.backend.repository.UserRepo;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo;

    // Implement filter logic to intercept requests and validate JWT tokens
    @SuppressWarnings("null")
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, java.io.IOException {
        
            String header = request.getHeader("Authorization");

            if(header != null && header.startsWith("Bearer")){
                String token = header.substring(7);
                if(jwtUtil.validateToken(token)){
                    String email = jwtUtil.extractEmail(token);
                    User user = userRepo.findByEmail(email);
                    if(user != null){
                        // User is authenticated
                         UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    user.getEmail(),
                                    null,
                                    List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
                            );
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                    // You can set the user details in the s    ecurity context here
                }
            }
        filterChain.doFilter(request, response);
    }
}
