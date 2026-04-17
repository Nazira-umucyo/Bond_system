package com.bnr.bondsystem.controller;

import com.bnr.bondsystem.entity.Role;
import com.bnr.bondsystem.entity.User;
import com.bnr.bondsystem.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.bnr.bondsystem.dto.UserDTO;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        System.out.println("LOGIN HIT");
        System.out.println("USERNAME: " + loginRequest.getUsername());
        System.out.println("PASSWORD: " + loginRequest.getPassword());
        return userService.login(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );
    }
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDTO dto) {

        try {
            System.out.println("ROLE RECEIVED: " + dto.getRole());

            User user = userService.createUser(
                    dto.getUsername(),
                    dto.getPassword(),
                    Role.valueOf(dto.getRole().trim().toUpperCase())
            );

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}