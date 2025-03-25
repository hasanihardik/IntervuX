package com.project.LoginSignup_Backend.service;


import com.project.LoginSignup_Backend.model.AuthTokenResponse;
import com.project.LoginSignup_Backend.model.LoginRequest;
import com.project.LoginSignup_Backend.model.UserEntity;
import com.project.LoginSignup_Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public ResponseEntity<String> save(UserEntity userEntity) {
        userEntity.setPassword(encoder.encode(userEntity.getPassword()));
        userRepository.save(userEntity);
        return new ResponseEntity<>("Created", HttpStatus.CREATED);
    }

    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return new ResponseEntity<>(userRepository.findAll(),HttpStatus.OK);
    }

    public boolean matchesPass(String password, String password1) {
        return encoder.matches(password1,password);
    }

    public AuthTokenResponse login(LoginRequest loginRequest) {
        UserEntity user = userRepository.findByUsernameOrEmail(loginRequest.getIdentifier())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return AuthTokenResponse.builder()
                .message("Login successful")
                .token(jwtService.generateToken(user.getUsername()))
                .profileCompleted(user.isProfileCompleted())
                .build();
    }

    public ResponseEntity<?> deleteUser(Long id) {
        Optional<UserEntity> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());  // Deletes both user and profile
            return new ResponseEntity<>("Deleted",HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
