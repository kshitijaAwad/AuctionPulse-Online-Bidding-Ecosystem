package com.auction.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginDTO {

	@NotBlank(message = "Email can not be blank !!")
	private String email;
	
	@NotBlank(message = "Password can not be blank !!")
	private String password;
}
