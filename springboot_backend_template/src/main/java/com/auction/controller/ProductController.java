package com.auction.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auction.dto.ProductDTO;
import com.auction.service.ProductService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class ProductController {
	
	private final ProductService productService;
	
	@PostMapping("/addProducts")
	public ResponseEntity<?> addProduct(@Valid @RequestBody ProductDTO dto){
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(productService.addProduct(dto));
	}
	
	@GetMapping("/list")
	public ResponseEntity<?> getAllProducts(){
		return ResponseEntity.ok(productService.getAllProducts());
	}
	
	@PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                          @Valid @RequestBody ProductDTO dto) {
        return ResponseEntity.ok(productService.updateProduct(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.deleteProduct(id));
    }
}
