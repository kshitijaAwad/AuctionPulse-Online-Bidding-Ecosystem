package com.auction.service;


import java.util.List;

import com.auction.dto.OrderResponseDTO;


public interface OrderService {

	OrderResponseDTO getOrderByID(Long orderId);
	
	List<OrderResponseDTO> getAllOrders();
	OrderResponseDTO placeOrder(Long auctionId);

}
