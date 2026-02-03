package com.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.auction.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
