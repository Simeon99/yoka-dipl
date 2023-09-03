package com.yoka.yokafurniture.payload.Autentication;

import lombok.Data;

@Data
public class UserResponse {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phone;
}
