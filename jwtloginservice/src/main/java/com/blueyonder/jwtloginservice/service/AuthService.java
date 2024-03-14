package com.blueyonder.jwtloginservice.service;
import java.util.Collection;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.blueyonder.jwtloginservice.dto.MessageResponse;
import com.blueyonder.jwtloginservice.entities.UserCredentials;
import com.blueyonder.jwtloginservice.exceptions.UsernameAlreadyExistsException;

public interface AuthService {
	public ResponseEntity<MessageResponse> saveUser(SignupRequest credentials) throws UsernameAlreadyExistsException;
	public String generateToken(String username, Collection<? extends GrantedAuthority> collection);
	public void validateT(String token);
}
