package com.auction.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.entity.Auction;
import com.auction.entity.AuctionStatus;

public interface AuctionRepository extends JpaRepository<Auction, Long> {

    List<Auction> findByStatusAndEndTimeAfter(AuctionStatus status,LocalDateTime currentTime);
    List<Auction> findByStatusAndEndTimeBefore(AuctionStatus status,LocalDateTime time);
    List<Auction> findByStatus(AuctionStatus status);
    Auction findByProduct_ItemIdAndStatus(Long itemId, AuctionStatus status);

}
