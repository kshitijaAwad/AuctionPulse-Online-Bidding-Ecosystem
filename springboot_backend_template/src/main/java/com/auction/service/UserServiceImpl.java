package com.auction.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auction.dto.ApiResponse;
import com.auction.dto.ApiResponseJwt;
import com.auction.dto.LoginDTO;
import com.auction.dto.UserRegDto;
import com.auction.entity.Role;
import com.auction.entity.User;
import com.auction.exception.InvalidCredentialsException;
import com.auction.exception.ResourceAlreadyExistsException;
import com.auction.exception.ResourceNotFoundException;
import com.auction.repository.UserRepository;
import com.auction.security.JwtUtil;
import com.auction.logger.DotNetLogger;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Override
    public ApiResponse register(UserRegDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            DotNetLogger.log("REG_FAILED: Email " + dto.getEmail() + " is already registered.");
            throw new ResourceAlreadyExistsException("Email already registered!");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); 
        user.setRole(Role.valueOf(dto.getRole().toUpperCase()));

        userRepository.save(user);

        DotNetLogger.log("REG_SUCCESS: New user registered with email: " + dto.getEmail() + " as " + dto.getRole());

        return new ApiResponse("User Registered Successfully", "SUCCESS");
    }

    @Override
    public ApiResponseJwt login(LoginDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> {
                    DotNetLogger.log("AUTH_FAILED: Login attempt with non-existent email: " + dto.getEmail());
                    return new ResourceNotFoundException("User not found with email: " + dto.getEmail());
                });

        if (!user.getPassword().equals(dto.getPassword())) {
            DotNetLogger.log("AUTH_FAILED: Incorrect password for user: " + dto.getEmail());
            throw new InvalidCredentialsException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        DotNetLogger.log("AUTH_SUCCESS: User " + user.getEmail() + " logged in successfully with Role: " + user.getRole().name());

        return new ApiResponseJwt(
                "Login SuccessFull!!",
                "SUCCESS",
                token,
                user.getUserId(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}