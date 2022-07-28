import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { Product } from '../products';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-order',
  template: `
    <h5>Your order Summary!</h5>

    <h5>User id: {{ user_id }}</h5>
    <div *ngFor="let product of productsCart; let i = index">
      <h5>Product: {{ i + 1 }}</h5>
      <h5>Product Name: {{ product.name }}</h5>
      <h5>Quantity: {{ product.quantity }}</h5>
      <h5>Total Price: {{ product.total }}</h5>
      <br />
    </div>
    <h5>Your final Summar for payment</h5>
    <h5>Total Quantity: {{ total_quantity }}</h5>
    <h5>Total Amount: {{ total_amount }}</h5>

    <button class="login__Btn1" (click)="placeOrderBackend()">pay here</button>
  `,

  styles: [
    `
      .login__Btn1 {
        background: #f0c14b;
        border-radius: 2px;
        width: 20%;
        height: 35px;
        border: 1px solid;
        margin-top: 10px;
      }
    `,
  ],
})
export class OrderComponent implements OnInit {
  cartLists: Array<any> = [];
  usertoken: any;
  decoded: any;
  user_id!: string;
  productsCart: Array<any> = [];
  total_amount: number = 0;
  total_quantity: number = 0;
  constructor(private router: Router, private service: CommonServiceService) {
    this.decoded = jwt_decode(this.service.usertoken.data);
    this.user_id = this.decoded.id;
    this.productsCart = this.service.cartLists;
    this.total_amount = this.service.totalPrice;
    this.total_quantity = this.service.totalItem;
  }
  placeOrderBackend() {
    let payload = {
      user_id: this.user_id,
      product: this.productsCart,
      total_amount: this.total_amount,
      totalQuantity: this.total_quantity,
    };
    this.service.addOrder(payload).subscribe((response: any) => {});
    this.router.navigate(['user', 'pay']);
  }
  gotoPayment() {}
  ngOnInit(): void {}
}
