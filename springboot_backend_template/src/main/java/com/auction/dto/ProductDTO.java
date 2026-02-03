package com.auction.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductDTO {

	@NotBlank(message = "Title can not be blank !!")
	private String title;
	
	@NotBlank(message = "Description can not be blank !!")
	private String description;
	
	@NotBlank(message = "Category can not be blank !!")
	private String Category;
	
	@NotNull(message = "Start Price can not be blank !!")
	private Double startPrice;
	
	private Double reservePrice;
		
	private String imageUrl;
	
	@NotNull(message = "Seller Id can not be null !!")
	private Long sellerId;
}
