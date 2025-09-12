package com.onlinegrocerysystem.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.onlinegrocerysystem.backend.entity.User;
import com.onlinegrocerysystem.backend.repository.UserRepo;

@Service
public class UserService {
    
    @Autowired
    UserRepo userRepo;

    public User getUserById(Long id){
        return userRepo.findById(id).orElse(null);
    }
    
    public List<User> getAllUser(){
        return userRepo.findAll();
    }
    
    public User updateUser(String id, User user){
        Long uid=Long.valueOf(id);
        User existingUser=userRepo.findById(uid).orElse(null);
        if(existingUser!=null){
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setRole(user.getRole());
            return userRepo.save(existingUser);
        }
        return null;
    }

    public List<User> getbypaging(Pageable pageable){
        return userRepo.findAll(pageable).getContent();
    }
    
    public User addNewUser(User user){
        return userRepo.save(user);
    }

    public void deleteUser(Long id){
        userRepo.deleteById(id);
    }

    public User updateUserAddress(Long id, String address) {
    User existingUser = userRepo.findById(id).orElse(null);
    if (existingUser != null) {
        existingUser.setAddress(address);
        return userRepo.save(existingUser);
    }
    return null;
    }


}
