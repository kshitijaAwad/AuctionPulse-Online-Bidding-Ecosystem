package com.auction.service;

import com.auction.dto.ApiResponse;
import com.auction.dto.BidDTO;

import jakarta.validation.Valid;

public interface BidService {

	ApiResponse placeBid(BidDTO dto);

}
