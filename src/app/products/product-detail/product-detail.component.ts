import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  private productService = inject(ProductService)
  private route = inject(ActivatedRoute)

  product: Product;

  constructor() {
    let id = this.route.snapshot.params['id']
    this
      .productService
      .getProductById(id)
      .subscribe(
        data => this.product = data
      )
  }
}
