package com.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	
}
