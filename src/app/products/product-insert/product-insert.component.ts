import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-insert',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-insert.component.html',
  styleUrl: './product-insert.component.css'
})
export class ProductInsertComponent {

  private productService = inject(ProductService)
  private router = inject(Router)

  onSubmit(newProduct: Product): void {
    this
      .productService
      .insertProduct(newProduct)
      .subscribe(
        {
          next: product => {
            console.log('New product saved on server with id: ' + product.id)
            this.productService.initProducts()
            this.router.navigateByUrl('/products')
          },
          error: err => console.error('Could not save product: ' + err.message)
        }
      )
  }

}
