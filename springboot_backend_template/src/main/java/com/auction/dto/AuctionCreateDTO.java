package com.auction.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AuctionCreateDTO {

    @NotNull(message = "Product Id can not be null !!")
    private Long productId;

    @NotNull(message = "Duration minutes can not be null !!")
    private Integer durationMinutes;
}

