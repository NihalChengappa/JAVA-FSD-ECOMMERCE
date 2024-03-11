package com.blueyonder.jwtloginservice.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;
import lombok.ToString.Exclude;

@Entity
@Table(name="user_info")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserCredentials{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	private String username;
	private String email;
	private String password;
//	@ManyToMany(fetch = FetchType.LAZY)
//	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
//	@Exclude
//	private Set<Role> roles = new HashSet<>();
}
