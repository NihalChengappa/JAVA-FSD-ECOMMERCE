package com.blueyonder.jwtloginservice.service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blueyonder.jwtloginservice.dto.MessageResponse;
import com.blueyonder.jwtloginservice.entities.ERole;
import com.blueyonder.jwtloginservice.entities.Role;
import com.blueyonder.jwtloginservice.entities.UserCredentials;
import com.blueyonder.jwtloginservice.exceptions.UsernameAlreadyExistsException;
import com.blueyonder.jwtloginservice.repositories.RoleRepository;
import com.blueyonder.jwtloginservice.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JWTService jwtService;
	
	@Override
    public ResponseEntity<MessageResponse> saveUser(SignupRequest credentials) throws UsernameAlreadyExistsException {
        if (userRepository.existsByUsername(credentials.getUsername())) {
            throw new UsernameAlreadyExistsException("Error: Username is already taken!");
        }
        UserCredentials newuser= new UserCredentials(credentials.getUsername(),credentials.getEmail(),passwordEncoder.encode(credentials.getPassword()));
        Set<String> strRoles = credentials.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "child":
					Role childRole = roleRepository.findByName(ERole.ROLE_CHILD)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(childRole);

					break;
				case "parent":
					Role parentRole = roleRepository.findByName(ERole.ROLE_PARENT)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(parentRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		newuser.setRoles(roles);
		//saving UserEntity to the database 
		userRepository.save(newuser);
        return ResponseEntity.ok(new MessageResponse("User has been stored"));
    }

	@Override
	public String generateToken(String username,Collection<? extends GrantedAuthority> collection) {
		return jwtService.generateToken(username,collection);
	}

	@Override
	public void validateT(String token) {
		jwtService.validateToken(token);
		
	}

}
