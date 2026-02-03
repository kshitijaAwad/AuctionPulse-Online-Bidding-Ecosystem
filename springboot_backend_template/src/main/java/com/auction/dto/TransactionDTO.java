package com.auction.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TransactionDTO {
	
	@NotNull(message = "Order Id can not be null !!")
	private Long orderId;
	
	@NotNull(message="Amount can not be null")
	private Double amount;
	
	@NotNull(message="Transaction type can not be null !!")
	private String transactionType;
}
