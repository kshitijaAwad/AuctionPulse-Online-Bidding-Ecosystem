package com.auction.service;

import java.util.List;

import com.auction.dto.ApiResponse;
import com.auction.dto.ProductDTO;
import com.auction.entity.Product;

import jakarta.validation.Valid;

public interface ProductService {

	ApiResponse addProduct(ProductDTO dto);

	List<Product> getAllProducts();
	
	 ApiResponse updateProduct(Long id, @Valid ProductDTO dto);

	 ApiResponse deleteProduct(Long id);

}
