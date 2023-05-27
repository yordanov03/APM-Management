import { Component } from '@angular/core';

import { EMPTY, Subscription, catchError } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent  {
  pageTitle = 'Products';
  errorMessage = '';

  products$ = this.productService.productsWithCategories$.pipe(
    catchError(err=>{
      this.errorMessage = err;
      return EMPTY
    })
  )
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  selectedProduct$ = this.productService.selectedProduct$

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId)
  }
}
