package com.auction.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRegDto {
	
	@NotBlank(message = "UserName can not be blank !!")
	private String username;
	@NotBlank(message = "Email can not be blank !!")
	@Email
	private String email;
	@NotBlank(message = "Password can not be blank !!")
	private String password;
	@NotNull(message = "Role can not be null !!")
	private String role;
	
}
