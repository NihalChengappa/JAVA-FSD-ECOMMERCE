package com.blueyonder.projectconfigservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class ProjectconfigserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectconfigserviceApplication.class, args);
	}

}
