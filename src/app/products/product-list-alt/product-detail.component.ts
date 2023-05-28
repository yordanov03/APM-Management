import { Component } from '@angular/core';
import { Supplier } from '../../suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';
import { EMPTY, Subject, catchError } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  productSuppliers: Supplier[] | null = null;

  constructor(private productService: ProductService) { }

  product$ = this.productService.selectedProduct$.pipe(
    catchError(err=>{
      this.errorMessageSubject.next(err)
      return EMPTY
    })
  )

}
