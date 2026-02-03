package com.auction.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BidDTO {

	@NotNull(message = "Auction Id can not be null !!")
	private Long auctionId;
	
	@NotNull(message = "Bidder Id can not be null !!")
	private Long bidderId;
	
	@NotNull(message = "Amount can not be null !!")
	private Double amount;
	
}
