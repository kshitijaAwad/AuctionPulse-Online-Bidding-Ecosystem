package com.auction.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.auction.dto.ApiResponse;
import com.auction.dto.ProductDTO;
import com.auction.entity.Product;
import com.auction.entity.User;
import com.auction.exception.ResourceNotFoundException;
import com.auction.repository.ProductRepository;
import com.auction.repository.UserRepository;
import com.auction.logger.DotNetLogger;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public ApiResponse addProduct(ProductDTO dto) {
        User seller = userRepository.findById(dto.getSellerId())
                .orElseThrow(() -> {
                    DotNetLogger.log("PRODUCT_ADD_FAILED: Seller ID " + dto.getSellerId() + " not found.");
                    return new ResourceNotFoundException("Seller not found with ID: " + dto.getSellerId());
                });

        Product product = new Product();
        product.setTitle(dto.getTitle());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        product.setStartPrice(dto.getStartPrice());
        product.setReservePrice(dto.getReservePrice());
        product.setImageUrl(dto.getImageUrl());
        product.setSeller(seller);

        productRepository.save(product);

        DotNetLogger.log("PRODUCT_ADDED: Title: " + dto.getTitle() + " by Seller: " + seller.getEmail());

        return new ApiResponse("Product added successfully", "SUCCESS");
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public ApiResponse updateProduct(Long id, @Valid ProductDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    DotNetLogger.log("PRODUCT_UPDATE_FAILED: Product ID " + id + " not found.");
                    return new ResourceNotFoundException("Product not found with ID: " + id);
                });

        product.setTitle(dto.getTitle());
        product.setDescription(dto.getDescription());
        product.setCategory(dto.getCategory());
        product.setStartPrice(dto.getStartPrice());
        product.setReservePrice(dto.getReservePrice());
        product.setImageUrl(dto.getImageUrl());

        productRepository.save(product);

        DotNetLogger.log("PRODUCT_UPDATED: Item ID " + id + " updated to title: " + dto.getTitle());

        return new ApiResponse("Product Updated Successfully", "SUCCESS");
    }

    @Override
    public ApiResponse deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> {
                    DotNetLogger.log("PRODUCT_DELETE_FAILED: Product ID " + id + " not found.");
                    return new ResourceNotFoundException("Product not found with ID: " + id);
                });

        productRepository.delete(product);

        DotNetLogger.log("PRODUCT_DELETED: Item ID " + id + " removed from inventory.");

        return new ApiResponse("Product Deleted Successfully", "SUCCESS");
    }
}