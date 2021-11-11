package com.example.cruda3redes.controller;

import com.example.cruda3redes.entity.User;
import com.example.cruda3redes.repository.UserRepository;
import com.example.cruda3redes.request.Login;
import com.example.cruda3redes.request.UserRequest;
import com.example.cruda3redes.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository repository;

    @PostMapping("/singup")
    public ResponseEntity<UserResponse> singUp(@Valid @RequestBody UserRequest request) {
        try {

            var user = new User(request.getName(), request.getLogin(), request.getPassword());

            this.repository.save(user);

            var response = new UserResponse(request.getName(), request.getLogin());
            return ResponseEntity.ok(response);

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
}
