package com.example.ecommercebackend.controller;

import com.example.ecommercebackend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final JwtUtil jwtUtil;

    @GetMapping("/profile")
    public String getProfile(@RequestHeader("Authorization") String token) {

        // remove "Bearer " prefix
        token = token.replace("Bearer ", "");

        String email = jwtUtil.extractEmail(token);

        return "Welcome user: " + email;
    }
}