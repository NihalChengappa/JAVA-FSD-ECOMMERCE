package com.blueyonder.jwtloginservice.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginRequest {
	private String username;
	private String password;
	
	
}
