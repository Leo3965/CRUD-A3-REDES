package com.example.cruda3redes.repository;


import com.example.cruda3redes.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
