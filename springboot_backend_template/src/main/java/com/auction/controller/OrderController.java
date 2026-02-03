package com.auction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/orders")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

	private final OrderService orderservice;
	
	@GetMapping("/{orderId}")
	public ResponseEntity<?> getOrder(@PathVariable Long orderId){
		return ResponseEntity.ok(orderservice.getOrderByID(orderId));
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllOrders() {
	    return ResponseEntity.ok(orderservice.getAllOrders());
	}
	
	@PostMapping("/place/{auctionId}")
	public ResponseEntity<?> placeOrder(@PathVariable Long auctionId) {
	    return ResponseEntity.ok(orderservice.placeOrder(auctionId));
	}
}
