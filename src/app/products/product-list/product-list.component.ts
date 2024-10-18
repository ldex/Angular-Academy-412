import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  selectedProduct: Product

  title: string = 'Products'

  // Pagination
  pageSize = 5
  start = 0
  end = this.pageSize
  pageNumber = 1

  previousPage() {
    this.start -= this.pageSize
    this.end -= this.pageSize
    this.pageNumber--
    this.selectedProduct = null
  }

  nextPage() {
    this.start += this.pageSize
    this.end += this.pageSize
    this.pageNumber++
    this.selectedProduct = null
  }

  private productService = inject(ProductService)
  private router = inject(Router)

  // products: Product[];

  // constructor() {
  //   this
  //   .productService
  //   .products$
  //   .pipe(
  //     takeUntilDestroyed()
  //   )
  //   .subscribe(
  //     {
  //       next: data => this.products = data,
  //       error: err => console.error(err.message)
  //     }
  //    )
  // }

  products$: Observable<Product[]> = this.productService.products$

  onSelect(product: Product) {
    this.selectedProduct = product
    this.router.navigateByUrl('/products/' + product.id)
  }
}
