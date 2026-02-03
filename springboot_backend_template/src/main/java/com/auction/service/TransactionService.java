package com.auction.service;

import com.auction.dto.ApiResponse;
import com.auction.dto.TransactionDTO;

import jakarta.validation.Valid;

public interface TransactionService {

	ApiResponse processPayment(@Valid TransactionDTO dto);

}
