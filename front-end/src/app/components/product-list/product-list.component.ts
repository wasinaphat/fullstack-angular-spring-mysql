import { Product } from './../../common/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log(this.searchMode)
    if (this.searchMode) {

      this.handleSearchProduct();
    }
    else {
      console.log("not search mode")
      this.handleListProducts();
    }

  }
  handleSearchProduct() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(theKeyword).subscribe(data => {
      this.products = data;
    });

  }
  handleListProducts() {
    //check if "id" parameter is  available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      //get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      // not category id available ...default to create category id 1
      this.currentCategoryId = 1;
    }

    // new get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(data => {
      this.products = data;
    });
  }

}
