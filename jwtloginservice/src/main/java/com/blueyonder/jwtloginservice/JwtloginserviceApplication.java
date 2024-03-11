package com.blueyonder.jwtloginservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;

@EnableDiscoveryClient
@OpenAPIDefinition
@SpringBootApplication
public class JwtloginserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(JwtloginserviceApplication.class, args);
	}

}
