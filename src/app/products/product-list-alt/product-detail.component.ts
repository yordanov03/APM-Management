import { Component } from '@angular/core';
import { Supplier } from '../../suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  errorMessage = '';
  productSuppliers: Supplier[] | null = null;

  constructor(private productService: ProductService) { }

  product$ = this.productService.selectedProduct$.pipe(
    catchError(err=>{
      this.errorMessage = err;
      return EMPTY
    })
  )

}
