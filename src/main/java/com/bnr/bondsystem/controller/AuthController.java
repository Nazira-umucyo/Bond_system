package com.bnr.bondsystem.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import com.bnr.bondsystem.dto.LoginRequest;
import com.bnr.bondsystem.security.JwtSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final JwtSecurity jwtSecurity = new JwtSecurity();


    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        if ("admin".equals(request.getUsername()) &&
                "password".equals(request.getPassword())) {
            return jwtSecurity.generateToken(request.getUsername());
        }
        return "invalid credentials";
    }
}
