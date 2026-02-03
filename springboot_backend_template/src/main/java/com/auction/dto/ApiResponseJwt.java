package com.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseJwt {

    private String message;
    private String status;
    private String token;

    private Long userId;
    private String email;
    private String role;
}
