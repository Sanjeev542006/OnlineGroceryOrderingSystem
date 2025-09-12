package com.onlinegrocerysystem.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinegrocerysystem.backend.entity.User;
import com.onlinegrocerysystem.backend.service.UserService;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    UserService users;

    @GetMapping
    public List<User> getMethodName() {
        return users.getAllUser();
    }
    
    @GetMapping("/paging")
    public List<User> getuserbypages(@RequestParam(defaultValue="0") int page,@RequestParam(defaultValue="5") int size)
    {
        // Sort sort=Sort.by(Sort.Direction.ASC,"id");
        Pageable pageable=Pageable.ofSize(size).withPage(page);
        return users.getbypaging(pageable);
    }
    
    @GetMapping("/{id}")
    public User getMethodName(@PathVariable Long id) {
        return users.getUserById(id);
    }
    
    @PutMapping("path/{id}")
    public String putMethodName(@PathVariable String id, @RequestBody User user) {
        
        users.updateUser(id, user);
        return "PUT Response";
    }
    
    @PostMapping("/addUser")
    public String addNewUser(@RequestBody User user) {
        users.addNewUser(user);
        return "Posted Data"; 
    }
    
    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable Long id) {
        users.deleteUser(id);
        return "Deleted User";
    }

    @PatchMapping("/{id}/address")
    public String updateAddress(@PathVariable Long id, @RequestBody User user) {
    users.updateUserAddress(id, user.getAddress());
    return "Address updated successfully";
    }   


}
