package com.auction.dto;

import lombok.Data;

@Data
public class ApiResponse {

	private String message;
	private String status;
	
	public ApiResponse(String message,String status) {
		
		this.message=message;
		this.status=status;
	}
}
