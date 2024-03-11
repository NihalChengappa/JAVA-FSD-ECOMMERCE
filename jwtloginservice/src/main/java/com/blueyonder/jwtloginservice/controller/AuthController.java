package com.blueyonder.jwtloginservice.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.blueyonder.jwtloginservice.dto.LoginRequest;
import com.blueyonder.jwtloginservice.dto.MessageResponse;
import com.blueyonder.jwtloginservice.entities.UserCredentials;
import com.blueyonder.jwtloginservice.exceptions.UsernameAlreadyExistsException;
import com.blueyonder.jwtloginservice.service.AuthService;
import com.blueyonder.jwtloginservice.service.CustomUserDetails;
import org.springframework.http.MediaType;

//@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private AuthService authService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/register")
	public ResponseEntity<MessageResponse> addNewUser(@RequestBody UserCredentials user) throws UsernameAlreadyExistsException {
		
		return authService.saveUser(user);
	}
	@GetMapping("/validate")
	public String validateToken(@RequestParam(name="token")String token){
		return "Token is valid";
	}
	@PostMapping(value="/login",consumes =MediaType.ALL_VALUE)
	public String userLogin(@RequestBody LoginRequest userCredentials) {
		System.out.println(userCredentials);
		try {
			Authentication authenticate= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userCredentials.getUsername(), userCredentials.getPassword()));
			if(authenticate.isAuthenticated()) {
				SecurityContextHolder.getContext().setAuthentication(authenticate);
				String jwt = authService.generateToken(userCredentials.getUsername());
				
				CustomUserDetails userDetails = (CustomUserDetails) authenticate.getPrincipal();		
			
				return jwt;
			}
		} catch (Exception e) {
			return "Invalid Access";
		}
		return null;
		
	

	}
}
