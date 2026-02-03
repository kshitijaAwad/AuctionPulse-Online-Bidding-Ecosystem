package com.auction.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.dto.AuctionCreateDTO;
import com.auction.service.AuctionService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/auctions")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuctionController {
	
	private final AuctionService auctionService;
	
	@PostMapping("/start")
	public ResponseEntity<?> startAuction(@Valid @RequestBody AuctionCreateDTO dto){
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(auctionService.startAuction(dto));
	}
		
	@GetMapping("/live")
	public ResponseEntity<?> getLiveAuctions(){
		return ResponseEntity.ok(auctionService.getLiveAuctions());
	}
	
	@PutMapping("/{id}/close")
    public ResponseEntity<?> closeAuction(@PathVariable Long id) {
        return ResponseEntity.ok(auctionService.closeAuction(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAuction(@PathVariable Long id) {
        return ResponseEntity.ok(auctionService.cancelAuction(id));
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllAuctions() {
        return ResponseEntity.ok(auctionService.getAllAuctions()); 
    }
}
