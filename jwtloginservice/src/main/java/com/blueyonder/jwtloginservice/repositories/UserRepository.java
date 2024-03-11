package com.blueyonder.jwtloginservice.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blueyonder.jwtloginservice.entities.UserCredentials;

public interface UserRepository extends JpaRepository<UserCredentials, Integer>{

	Optional<UserCredentials> findByUsername(String username);

	public boolean existsByUsername(String username);

}
