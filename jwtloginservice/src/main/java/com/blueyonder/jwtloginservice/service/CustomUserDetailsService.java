package com.blueyonder.jwtloginservice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.blueyonder.jwtloginservice.entities.UserCredentials;
import com.blueyonder.jwtloginservice.repositories.UserRepository;

@Component
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		Optional<UserCredentials> userCredential= userRepository.findByUsername(username);
		return userCredential.map(CustomUserDetails::new).orElseThrow(()->new UsernameNotFoundException("User not found with name :"+username));
	}

}
