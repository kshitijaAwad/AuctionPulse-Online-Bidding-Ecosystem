package com.auction.schedular;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.auction.entity.Auction;
import com.auction.entity.AuctionStatus;
import com.auction.repository.AuctionRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuctionScheduler {

    private final AuctionRepository auctionRepository;

    @Scheduled(fixedRate = 60000)
    public void closeExpiredAuctions() {

        List<Auction> expiredAuctions =
                auctionRepository.findByStatusAndEndTimeBefore(
                        AuctionStatus.ACTIVE,
                        LocalDateTime.now()
                );

        for (Auction auction : expiredAuctions) {
            auction.setStatus(AuctionStatus.COMPLETED);
        }

        auctionRepository.saveAll(expiredAuctions);
    }
}
