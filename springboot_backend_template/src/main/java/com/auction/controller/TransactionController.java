package com.auction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.dto.TransactionDTO;
import com.auction.service.TransactionService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/transactions")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

	private final TransactionService transactionService;
	
	@PostMapping
	public ResponseEntity<?> makePayment(@Valid @RequestBody TransactionDTO dto){
		return ResponseEntity.ok(transactionService.processPayment(dto));
	}
}
