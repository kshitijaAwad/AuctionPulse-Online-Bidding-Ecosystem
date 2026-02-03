//package com.auction.dto;
//
//import lombok.Data;
//
//@Data
//public class OrderResponseDTO {
//
//	private Long orderId;
//	
//	private Long productId;
//	
//	private Long buyerId;
//	
//	private Long sellerId;
//	
//	private Double finalPrice;
//	
//	private String status;
//}


package com.auction.dto;

import lombok.Data;

@Data
public class OrderResponseDTO {
    private Long orderId;
    private Double finalPrice;
    private String status;

    private Long productId;
    private Long buyerId;
    private Long sellerId;

    private String productTitle;
    private String buyerUsername;
    private String sellerUsername;
}