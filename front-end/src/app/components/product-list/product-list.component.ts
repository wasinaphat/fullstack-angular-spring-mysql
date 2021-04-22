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

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = null
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
    // if we have a different keyword than previous
    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe(this.processResult());
    // this.productService.searchProducts(theKeyword).subscribe(data => {
    //   this.products = data;
    // });

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
    // this.productService.getProductList(this.currentCategoryId).subscribe(data => {
    //   this.products = data;
    // });

    //
    //Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log("current Category", this.currentCategoryId, "page number", this.thePageNumber)
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(this.processResult());

  }
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

    }
  }
  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();

  }

}
