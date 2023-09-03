package com.yoka.yokafurniture.controller;

import com.yoka.yokafurniture.entity.Role;
import com.yoka.yokafurniture.entity.User;
import com.yoka.yokafurniture.payload.Autentication.JWTAuthResponse;
import com.yoka.yokafurniture.payload.Autentication.LoginDto;
import com.yoka.yokafurniture.payload.Autentication.SignUpDto;
import com.yoka.yokafurniture.payload.Autentication.UserResponse;
import com.yoka.yokafurniture.repository.RoleRepository;
import com.yoka.yokafurniture.repository.UserRepository;
import com.yoka.yokafurniture.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private JwtTokenProvider tokenProvider;


    @CrossOrigin
    @PostMapping("login")
    public ResponseEntity<JWTAuthResponse> authenticationUser(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // get token from tokenProvider

        String token = tokenProvider.generateToken(authentication);

//        User user = userRepository.findByUsernameOrEmail()
        User user = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail()).orElseThrow(() ->
                new UsernameNotFoundException("User not found with username or email:" + loginDto.getUsernameOrEmail()));
        UserResponse userResponse = new UserResponse();
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhone(user.getPhone());

        return ResponseEntity.ok(new JWTAuthResponse(token, userResponse));
    }

    @CrossOrigin
    @PostMapping("signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto){
        //add check for email exist in Db
        if(userRepository.existsByEmail(signUpDto.getEmail())){
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        //add check for username exist in Db
        if(userRepository.existsByUsername(signUpDto.getUsername())){
            return new ResponseEntity<>("Username is already taken!",HttpStatus.BAD_REQUEST);
        }

        //create user object
        User user = new User();
        user.setFirstName(signUpDto.getFirstName());
        user.setLastName(signUpDto.getLastName());
        user.setEmail(signUpDto.getEmail());
        user.setUsername(signUpDto.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(signUpDto.getPassword()));
        user.setPhone(signUpDto.getPhone());

        Role roles = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }
}
