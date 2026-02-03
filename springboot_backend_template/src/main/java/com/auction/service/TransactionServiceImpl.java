package com.auction.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auction.dto.ApiResponse;
import com.auction.dto.TransactionDTO;
import com.auction.entity.Order;
import com.auction.entity.OrderStatus;
import com.auction.entity.Transaction;
import com.auction.entity.TransactionType;
import com.auction.repository.OrderRepository;
import com.auction.repository.TransactionRepository;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final OrderRepository orderRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public ApiResponse processPayment(TransactionDTO dto) {

        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING) {
            return new ApiResponse("Order is already processed", "FAILED");
        }

        if (!order.getFinalPrice().equals(dto.getAmount())) {
            return new ApiResponse("Payment amount mismatch", "FAILED");
        }

        Transaction transaction = new Transaction();
        transaction.setOrder(order);
        transaction.setAmount(dto.getAmount());

        transaction.setTransactionType(
                TransactionType.valueOf(dto.getTransactionType().toUpperCase())
        );

        transaction.setTimestamp(java.time.LocalDateTime.now());

        transactionRepository.save(transaction);

        order.setStatus(OrderStatus.PAID);
        orderRepository.save(order);

        return new ApiResponse("Payment Successful", "SUCCESS");
    }
}