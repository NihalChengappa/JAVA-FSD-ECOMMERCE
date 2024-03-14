package com.blueyonder.productandcategoryservice.entities;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="product_info")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer productId;
	private String productName;
	private Integer productPrice;
	private String productDescription;
	@ManyToMany(mappedBy = "productList",fetch = FetchType.LAZY)
	@JsonIgnoreProperties("productList")
	private Set<Category>categoryList;
}
