package com.auction.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auction.dto.ApiResponse;
import com.auction.dto.BidDTO;
import com.auction.entity.Auction;
import com.auction.entity.AuctionStatus;
import com.auction.entity.Bid;
import com.auction.entity.User;
import com.auction.exception.InvalidBidException;
import com.auction.exception.InvalidOperationException;
import com.auction.exception.ResourceNotFoundException;
import com.auction.repository.AuctionRepository;
import com.auction.repository.BidRepository;
import com.auction.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BidServiceImpl implements BidService {

    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;
    private final BidRepository bidRepository;

    @Override
    public ApiResponse placeBid(BidDTO dto) {

        Auction auction = auctionRepository.findById(dto.getAuctionId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found with ID: " + dto.getAuctionId()));

        if (auction.getStatus() != AuctionStatus.ACTIVE) {
            throw new InvalidOperationException("Cannot place bid: Auction is " + auction.getStatus());
        }

        User bidder = userRepository.findById(dto.getBidderId())
                .orElseThrow(() -> new ResourceNotFoundException("Bidder not found with ID: " + dto.getBidderId()));

        Double currentHighBid = auction.getCurrentHighBid();
        if (currentHighBid != null && dto.getAmount() <= currentHighBid) {
            throw new InvalidBidException("Bid amount " + dto.getAmount() + " must be greater than current high bid " + currentHighBid);
        }

        Bid bid = new Bid();
        bid.setAuction(auction);
        bid.setBidder(bidder);
        bid.setAmount(dto.getAmount());

        bidRepository.save(bid);

        auction.setCurrentHighBid(dto.getAmount());
        auction.setCurrentHighBidder(bidder);

        auctionRepository.save(auction);

        return new ApiResponse("Bid placed successfully", "SUCCESS");
    }
}