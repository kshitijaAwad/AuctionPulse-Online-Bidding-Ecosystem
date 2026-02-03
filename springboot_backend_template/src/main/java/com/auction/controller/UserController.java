package com.auction.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.dto.LoginDTO;
import com.auction.dto.UserRegDto;
import com.auction.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

	private final UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody UserRegDto dto){
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(dto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto){
		return ResponseEntity.ok(userService.login(dto));
	}
}
