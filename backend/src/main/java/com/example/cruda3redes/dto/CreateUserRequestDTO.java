package com.example.cruda3redes.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Data
public class CreateUserRequestDTO {

    @NotEmpty
    @NotBlank
    private String name;

    @NotEmpty
    @NotBlank
    private String login;

    @NotEmpty
    @NotBlank
    private String password;

    @NotEmpty
    @NotBlank
    @Email
    private String email;
}
