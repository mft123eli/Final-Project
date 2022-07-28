import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonServiceService } from '../common-service.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products';

@Component({
  selector: 'app-onelist',
  template: `
    <div class="container">
      <div class="row">
        <div class="card col-md-3">
          <img class="productImg" [src]="productImg" /><br />
          Name: {{ product.name }}<br />
          Price: {{ product.price }}<br />
          <button (click)="addProduct(product)">Add to cart</button>
        </div>
      </div>
      <br />
    </div>
  `,
  styles: [],
})
export class OnelistComponent implements OnInit {
  @Input() product!: Product;
  productImg: string = '';
  products: Array<Product> = [];
  constructor(private service: CommonServiceService) {}
  addProduct(product: Product) {
    this.service.addToCartService(product);
  }
  ngOnInit(): void {
    this.productImg = `http://localhost:3000/uploads/${this.product.img}`;
  }
}
