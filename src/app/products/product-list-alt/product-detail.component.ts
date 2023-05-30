import { Component } from '@angular/core';
import { Supplier } from '../../suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';
import { EMPTY, Subject, catchError, combineLatest, filter, forkJoin, map } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle$ = this.productService.selectedProduct$.pipe(
    map(p => p? `Product Details for: ${p.productName}` : null)
  )
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  product$ = this.productService.selectedProduct$.pipe(
    catchError(err=>{
      this.errorMessageSubject.next(err)
      return EMPTY
    })
  )

  productSuppliers$ = this.productService.selectedProductSuppliers$.pipe(
    catchError(err=>{
      this.errorMessageSubject.next(err)
      return EMPTY
    })
  )

  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$
  ])
  .pipe(
    filter(([product])=> Boolean(product)),
    map(([product, productSuppliers, pageTitle]) =>
    ({product, productSuppliers, pageTitle}))
  )

  constructor(private productService: ProductService) { }



}
