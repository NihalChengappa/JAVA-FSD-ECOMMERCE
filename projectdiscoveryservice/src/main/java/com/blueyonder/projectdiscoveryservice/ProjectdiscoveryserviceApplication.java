package com.blueyonder.projectdiscoveryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ProjectdiscoveryserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectdiscoveryserviceApplication.class, args);
	}

}
