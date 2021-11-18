package com.example.cruda3redes.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Data
public class AuthRequestDTO {

    @NotEmpty
    @NotBlank
    private String login;

    @NotEmpty
    @NotBlank
    private String password;
}
