package com.blueyonder.jwtloginservice.service;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.blueyonder.jwtloginservice.dto.MessageResponse;
import com.blueyonder.jwtloginservice.entities.UserCredentials;
import com.blueyonder.jwtloginservice.exceptions.UsernameAlreadyExistsException;

public interface AuthService {
	public ResponseEntity<MessageResponse> saveUser(UserCredentials credentials) throws UsernameAlreadyExistsException;
	public String generateToken(String username);
	public void validateT(String token);
}
