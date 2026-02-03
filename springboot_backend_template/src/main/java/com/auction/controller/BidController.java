package com.auction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.dto.BidDTO;
import com.auction.service.BidService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/bids")
@AllArgsConstructor
public class BidController {

	private final BidService bidService;
	
	@PostMapping("/place")
	public ResponseEntity<?> placeBid(@Valid @RequestBody BidDTO dto){
		return ResponseEntity.ok(bidService.placeBid(dto));
	}

}
