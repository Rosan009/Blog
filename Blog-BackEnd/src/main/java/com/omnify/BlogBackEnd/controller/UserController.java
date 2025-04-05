package com.omnify.BlogBackEnd.controller;

import com.omnify.BlogBackEnd.config.JwtUtil;
import com.omnify.BlogBackEnd.model.User;
import com.omnify.BlogBackEnd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.Map;

@RestController
public class UserController {

    @Autowired private JwtUtil tokenService;

    @Autowired private AuthenticationManager authenticationManager;

    @Autowired private UserService userService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Authentication authenticator = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        if (authenticator.isAuthenticated()) {
            String token = tokenService.generateToken(user.getEmail());
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
    }
    @PostMapping("sign")
    public ResponseEntity<?> signIn(@RequestBody User userDetail) {
        try {
            userService.addUser(userDetail);
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"message\": \"Error creating user\"}");
        }
    }
}
