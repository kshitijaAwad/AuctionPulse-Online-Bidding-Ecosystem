package com.auction.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.auction.dto.OrderResponseDTO;
import com.auction.entity.Auction;
import com.auction.entity.AuctionStatus;
import com.auction.entity.Order;
import com.auction.entity.OrderStatus;
import com.auction.repository.AuctionRepository;
import com.auction.repository.OrderRepository;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final AuctionRepository auctionRepository;

    private OrderResponseDTO mapToResponseDTO(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderId(order.getOrderId());
        dto.setFinalPrice(order.getFinalPrice());
        dto.setStatus(order.getStatus().name());

        dto.setProductId(order.getProduct().getItemId());
        dto.setBuyerId(order.getBuyer().getUserId());
        dto.setSellerId(order.getSeller().getUserId());

        dto.setProductTitle(order.getProduct().getTitle());
        dto.setBuyerUsername(order.getBuyer().getUsername());
        dto.setSellerUsername(order.getSeller().getUsername());

        return dto;
    }

    @Override
    public OrderResponseDTO getOrderByID(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToResponseDTO(order);
    }

    @Override
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDTO placeOrder(Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        if (auction.getStatus() != AuctionStatus.COMPLETED) {
            throw new RuntimeException("Order can only be placed for completed auctions");
        }
        if (auction.getCurrentHighBidder() == null) {
            throw new RuntimeException("No winner found for this auction");
        }

        Order order = new Order();
        order.setProduct(auction.getProduct());
        order.setBuyer(auction.getCurrentHighBidder());
        order.setSeller(auction.getProduct().getSeller());
        order.setFinalPrice(auction.getCurrentHighBid());
        order.setStatus(OrderStatus.PENDING);

        return mapToResponseDTO(orderRepository.save(order));
    }
}