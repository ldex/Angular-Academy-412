import { Injectable } from '@angular/core';
import { delay, map, Observable, shareReplay, tap } from 'rxjs';
import { Product } from '../models/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://retoolapi.dev/U1A9pK/products/';

  products$: Observable<Product[]>

  constructor(private http: HttpClient) {
    this.initProducts()
  }

  insertProduct(newProduct: Product): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  getProductById(id: number): Observable<Product> {
     return this
            .products$
            .pipe(
              map(products => products.find(product => product.id == id))
            )
  }

  initProducts(): void {
    let url:string = this.baseUrl + '?_sort=modifiedDate&_order=desc';

    this.products$ = this
                        .http
                        .get<Product[]>(url)
                        .pipe(
                          tap(console.table),
                          shareReplay()
                          //delay(1500) // pour la démo....
                        )
  }

}
