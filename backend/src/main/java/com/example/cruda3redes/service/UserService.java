package com.example.cruda3redes.service;

import java.util.List;
import java.util.Optional;

import com.example.cruda3redes.dto.CreateUserRequestDTO;
import com.example.cruda3redes.entity.User;
import com.example.cruda3redes.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = this.userRepository.findByLogin(username);

        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User not founded");
        }

        return optionalUser.get();
    }

    public void createUser(CreateUserRequestDTO userDto) {
        this.userRepository.save(new User(
            userDto.getName(),
            userDto.getLogin(),
            userDto.getEmail(),
            this.passwordEncoder.encode(userDto.getPassword()))
        );
    }

    public List<User> findAll() {
        return this.userRepository.findAll();
    }
}
