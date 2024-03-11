package com.blueyonder.jwtloginservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blueyonder.jwtloginservice.dto.MessageResponse;
import com.blueyonder.jwtloginservice.entities.UserCredentials;
import com.blueyonder.jwtloginservice.exceptions.UsernameAlreadyExistsException;
import com.blueyonder.jwtloginservice.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JWTService jwtService;
	
	@Override
    public ResponseEntity<MessageResponse> saveUser(UserCredentials credentials) throws UsernameAlreadyExistsException {
        if (userRepository.existsByUsername(credentials.getUsername())) {
            throw new UsernameAlreadyExistsException("Error: Username is already taken!");
        }
        credentials.setPassword(passwordEncoder.encode(credentials.getPassword()));
        userRepository.save(credentials);
        return ResponseEntity.ok(new MessageResponse("User has been stored"));
    }

	@Override
	public String generateToken(String username) {
		return jwtService.generateToken(username);
	}

	@Override
	public void validateT(String token) {
		jwtService.validateToken(token);
		
	}

}
