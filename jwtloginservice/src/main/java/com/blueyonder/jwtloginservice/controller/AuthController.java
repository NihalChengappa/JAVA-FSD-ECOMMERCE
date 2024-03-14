package com.blueyonder.jwtloginservice.controller;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
//import com.blueyonder.jwtloginservice.entities.ERole;
//import com.blueyonder.jwtloginservice.entities.Role;
import com.blueyonder.jwtloginservice.entities.UserCredentials;
import com.blueyonder.jwtloginservice.exceptions.UsernameAlreadyExistsException;
//import com.blueyonder.jwtloginservice.repositories.RoleRepository;
import com.blueyonder.jwtloginservice.service.AuthService;
import com.blueyonder.jwtloginservice.service.CustomUserDetails;
import com.blueyonder.jwtloginservice.service.SignupRequest;

import org.springframework.http.MediaType;

//@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private AuthService authService;
	
//	@Autowired
//	private RoleRepository roleRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/register")
	public ResponseEntity<MessageResponse> addNewUser(@RequestBody SignupRequest user) throws UsernameAlreadyExistsException {
//		Set<Role> roles = new HashSet<>();	
//		Role userRole = roleRepository.findByName(ERole.ROLE_USER).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//		roles.add(userRole);
//		user.setRoles(roles);
		return authService.saveUser(user);
	}
	@PostMapping(value="/login",consumes =MediaType.ALL_VALUE)
	public String userLogin(@RequestBody LoginRequest userCredentials) {
		System.out.println(userCredentials);
		try {
			Authentication authenticate= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userCredentials.getUsername(), userCredentials.getPassword()));
			if(authenticate.isAuthenticated()) {
				SecurityContextHolder.getContext().setAuthentication(authenticate);
				CustomUserDetails userDetails = (CustomUserDetails) authenticate.getPrincipal();
				String jwt = authService.generateToken(userCredentials.getUsername(),userDetails.getAuthorities());
				
				
				return (jwt+","+userDetails.getAuthorities());
			}
		} catch (Exception e) {
			return "Invalid Access";
		}
		return null;
		
	

	}
}
