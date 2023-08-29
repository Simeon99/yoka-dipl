package com.yoka.yokafurniture.payload.Autentication;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class SignUpDto {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String phone;
}
