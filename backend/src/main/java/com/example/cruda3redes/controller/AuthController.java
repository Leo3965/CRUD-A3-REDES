package com.example.cruda3redes.controller;

import com.example.cruda3redes.entity.User;
import com.example.cruda3redes.entity.UserDetailsImpl;
import com.example.cruda3redes.dto.AuthRequestDTO;
import com.example.cruda3redes.dto.AuthResponseDTO;
import com.example.cruda3redes.dto.UserResponseDTO;
import com.example.cruda3redes.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping()
    public ResponseEntity login(@RequestBody @Valid AuthRequestDTO request) {
        try {
            Authentication authentication = this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getLogin(),
                            request.getPassword()
                    )
            );

            UserDetailsImpl user = (UserDetailsImpl) authentication.getPrincipal();

            String token = jwtService.sign(user.getUser());

            return ResponseEntity.ok().body(new AuthResponseDTO(token));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping()
    public ResponseEntity<UserResponseDTO> get(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok().body(new UserResponseDTO(user));
    }
}
