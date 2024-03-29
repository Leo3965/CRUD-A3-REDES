package com.example.cruda3redes.controller;

import java.util.List;

import javax.validation.Valid;

import com.example.cruda3redes.dto.CreateUserRequestDTO;
import com.example.cruda3redes.dto.UserResponseDTO;
import com.example.cruda3redes.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserResponseDTO> signUp(@Valid @RequestBody CreateUserRequestDTO userDto) {
        try {
            this.userService.createUser(userDto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserResponseDTO>> fetchUsers() {
        return ResponseEntity.ok(this.userService.findAll().stream().map(user -> new UserResponseDTO(user)).toList());
    }
}
