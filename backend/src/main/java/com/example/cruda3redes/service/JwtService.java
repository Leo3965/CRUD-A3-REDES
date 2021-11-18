package com.example.cruda3redes.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.cruda3redes.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.key}")
    private String key;

    public String sign(User user) {
        Algorithm algorithm = Algorithm.HMAC256(this.key);

        return JWT.create()
            .withSubject(user.getId().toString())
            .withExpiresAt(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
            .sign(algorithm);
    }

    public boolean validate(String token) {
        if(token == null) {
            return false;
        }

        DecodedJWT decodedJWT = JWT.decode(token);

        if(decodedJWT.getExpiresAt().getTime() > new Date().getTime()) {
            return true;
        }

        return false;
    }

    public Long decode(String token) {
        DecodedJWT decodedJWT = JWT.decode(token);
        return Long.parseLong(decodedJWT.getSubject());
    }
}
