package com.auction.service;

import java.util.List;

import com.auction.dto.ApiResponse;
import com.auction.dto.AuctionCreateDTO;
import com.auction.entity.Auction;

import jakarta.validation.Valid;

public interface AuctionService {

	ApiResponse startAuction(@Valid AuctionCreateDTO dto);

	List<Auction> getLiveAuctions();

	ApiResponse closeAuction(Long auctionId);

    ApiResponse cancelAuction(Long auctionId);
    
    List<Auction> getAllAuctions();
}
