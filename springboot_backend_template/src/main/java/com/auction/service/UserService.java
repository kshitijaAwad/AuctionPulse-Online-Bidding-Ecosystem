package com.auction.service;

import com.auction.dto.ApiResponse;
import com.auction.dto.ApiResponseJwt;
import com.auction.dto.LoginDTO;
import com.auction.dto.UserRegDto;

import jakarta.validation.Valid;

public interface UserService {

	ApiResponse register(@Valid UserRegDto dto);

	ApiResponseJwt login(@Valid LoginDTO dto);

}
