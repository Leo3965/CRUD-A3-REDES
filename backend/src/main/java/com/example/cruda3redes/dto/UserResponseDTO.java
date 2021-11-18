package com.example.cruda3redes.dto;

import com.example.cruda3redes.entity.User;
import lombok.Getter;

import java.util.Date;

@Getter
public class UserResponseDTO {
    private final Long id;
    private final String login;
    private final String name;
    private final String email;
    private final Date createdAt;
    private final Date updatedAt;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.name = user.getName();
        this.email = user.getEmail();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }
}
