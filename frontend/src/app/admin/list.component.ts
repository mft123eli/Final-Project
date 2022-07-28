import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonServiceService } from '../common-service.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products';

@Component({
  selector: 'app-list',
  template: `
    <p>list works!</p>
    <app-oneproduct
      *ngFor="let product of products"
      [product]="product"
    ></app-oneproduct>
  `,
  styles: [],
})
export class ListComponent implements OnInit {
  products: Array<Product> = [];
  subscribe: Subscription | undefined;

  constructor(private service: CommonServiceService) {
    this.service.getProduct().subscribe((response: any) => {
      this.service.products = response.data;
      this.products = this.service.products;
    });
  }

  ngOnInit(): void {}
}
