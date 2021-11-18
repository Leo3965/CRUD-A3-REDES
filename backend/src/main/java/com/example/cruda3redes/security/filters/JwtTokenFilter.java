package com.example.cruda3redes.security.filters;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.cruda3redes.entity.User;
import com.example.cruda3redes.repository.UserRepository;
import com.example.cruda3redes.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

@Service
public class JwtTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwtToken = this.getJwtFromHeader(request);
        boolean isTokenValid = this.jwtService.validate(jwtToken);

        if(isTokenValid) {
            this.authenticate(jwtToken);
        }

        filterChain.doFilter(request, response);
    }

    private void authenticate(String jwtToken) {
        Long userId = this.jwtService.decode(jwtToken);
        Optional<User> optionalUser = this.userRepository.findById(userId);

        if(optionalUser.isPresent()) {
            User user = optionalUser.get();

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
    }

    private String getJwtFromHeader(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(token == null || token.isEmpty() || !token.startsWith("Bearer")) {
            return null;
        }

        return token.replace("Bearer ", "");
    }
}
