package com.example.cruda3redes.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    @NonNull
    private String name;

    @NonNull
    @Column(nullable = false, unique = true)
    private String login;

    @NonNull
    @Column(nullable = false, unique = true)
    private String email;

    @NonNull
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Date createdAt;

    @Column(nullable = false)
    private Date updatedAt;

    @PrePersist()
    public void beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @PreUpdate()
    public void beforeUpdate() {
        this.updatedAt = new Date();
    }
}
