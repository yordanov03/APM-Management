import { Component, OnInit, OnDestroy } from '@angular/core';

import { BehaviorSubject, catchError, combineLatest, EMPTY, map } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  private categorySelectedSubject = new BehaviorSubject <number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError(err=>{
      this.errorMessage = err;
      return EMPTY;
    })
  )

  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.categorySelectedAction$
  ])
  .pipe(
    map(([products, selectedCategoryId])=>
    products.filter(product=>
      selectedCategoryId? product.categoryId === selectedCategoryId : true)),
      catchError(err=>{
        this.errorMessage = err;
        return EMPTY
      })
  )

  constructor(private productService: ProductService, 
    private productCategoryService: ProductCategoryService) { }


  onAdd(): void {
    this.productService.addProduct()
  }

  onSelected(categoryId: string): void {
 this.categorySelectedSubject.next(+categoryId)
  }
}
