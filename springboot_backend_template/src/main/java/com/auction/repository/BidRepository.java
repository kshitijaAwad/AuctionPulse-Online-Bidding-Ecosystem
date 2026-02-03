package com.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.entity.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {

}
