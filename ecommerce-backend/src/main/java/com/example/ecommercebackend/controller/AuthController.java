package com.example.ecommercebackend.controller;

import com.example.ecommercebackend.entity.User;
import com.example.ecommercebackend.security.JwtUtil;
import com.example.ecommercebackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        userService.login(email, password);
        return jwtUtil.generateToken(email);
    }
}