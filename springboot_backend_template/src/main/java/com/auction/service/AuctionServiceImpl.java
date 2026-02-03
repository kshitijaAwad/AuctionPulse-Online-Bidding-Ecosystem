package com.auction.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auction.dto.ApiResponse;
import com.auction.dto.AuctionCreateDTO;
import com.auction.entity.Auction;
import com.auction.entity.AuctionStatus;
import com.auction.entity.Product;
import com.auction.exception.ResourceAlreadyExistsException;
import com.auction.exception.ResourceNotFoundException;
import com.auction.repository.AuctionRepository;
import com.auction.repository.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AuctionServiceImpl implements AuctionService {

    private final AuctionRepository auctionRepository;
    private final ProductRepository productRepository;

    @Override
    public ApiResponse startAuction(AuctionCreateDTO dto) {

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + dto.getProductId()));

        Auction existing = auctionRepository.findByProduct_ItemIdAndStatus(
                dto.getProductId(),
                AuctionStatus.ACTIVE
        );

        if (existing != null) {
            throw new ResourceAlreadyExistsException("Auction already ACTIVE for this product!");
        }

        Auction auction = new Auction();
        auction.setProduct(product);
        auction.setStartTime(LocalDateTime.now());
        auction.setEndTime(LocalDateTime.now().plusMinutes(dto.getDurationMinutes()));
        auction.setStatus(AuctionStatus.ACTIVE);

        auction.setCurrentHighBid(product.getStartPrice());
        auction.setCurrentHighBidder(null);
        
        auctionRepository.save(auction);

        return new ApiResponse("Auction Started Successfully", "SUCCESS");
    }

    @Override
    public List<Auction> getLiveAuctions() {
        return auctionRepository.findByStatusAndEndTimeAfter(AuctionStatus.ACTIVE, LocalDateTime.now());
    }

    @Override
    public ApiResponse closeAuction(Long auctionId) {

        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found with ID: " + auctionId));

        auction.setStatus(AuctionStatus.COMPLETED);
        auctionRepository.save(auction);

        return new ApiResponse("Auction Closed Successfully", "SUCCESS");
    }

    @Override
    public ApiResponse cancelAuction(Long auctionId) {

        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found with ID: " + auctionId));

        auction.setStatus(AuctionStatus.CANCELLED);
        auctionRepository.save(auction);

        return new ApiResponse("Auction Cancelled Successfully", "SUCCESS");
    }
    
    @Override
    public List<Auction> getAllAuctions() {
        return auctionRepository.findAll();
    }
}