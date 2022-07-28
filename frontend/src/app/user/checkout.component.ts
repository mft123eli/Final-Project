import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { Product } from '../products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  template: `
    <h5>Well come to Checkout</h5>
    <h5>
      Quantity: {{ totalItem }} TotalPrice: {{ totalPrice }}
      <h5>
        <button class="login__Btn1" (click)="orderProduct()">
          place order
        </button>
        <div class="container">
          <div class="row">
            <div *ngFor="let product of cartLists; let i = index">
              Product: {{ i + 1 }}
              <h5>Product Name: {{ product.name }}</h5>
              <h5>Product Quantity: {{ product.quantity }}</h5>
              <h5>Price: {{ product.price }}</h5>
              <h5>product total Price:{{ product.total }}</h5>
              <button (click)="removeProductcartList(product)">
                remove the product
              </button>
            </div>
          </div>
        </div>
      </h5>
    </h5>
  `,
  styles: [``],
})
export class CheckoutComponent implements OnInit {
  cartLists: Array<any> = [];
  totalPrice: number = 0;
  totalItem: number = 0;

  constructor(private router: Router, private service: CommonServiceService) {}
  addFun() {
    this.totalPrice = this.cartLists.reduce((sum: any, item: any) => {
      return (sum += parseInt(item.total));
    }, 0);
    this.service.totalPrice = this.totalPrice;
  }
  totalQuantity() {
    this.totalItem = this.cartLists.reduce((sum: any, item: any) => {
      return (sum += parseInt(item.quantity));
    }, 0);
    this.service.totalItem = this.totalItem;
  }

  removeProductcartList(product: any) {
    const findProductIndex = this.cartLists.findIndex((pro) => {
      pro._id === product._id;
    });
    this.cartLists.splice(findProductIndex, 1);
    this.addFun();
    this.totalQuantity();
  }
  orderProduct() {
    this.router.navigate(['user', 'order']);
  }

  ngOnInit(): void {
    this.cartLists = this.service.cartLists;
    this.addFun();
    this.totalQuantity();
    this.cartLists.length = this.totalItem;
  }
}
