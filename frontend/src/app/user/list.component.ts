import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonServiceService } from '../common-service.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products';
@Component({
  selector: 'app-list',
  template: ` <app-header *ngFor="let product of products" [product]="product">
  </app-header>`,
  styles: [],
})
export class ListComponent implements OnInit {
  products: Array<Product> = [];
  subscribe: Subscription | undefined;

  constructor(private service: CommonServiceService) {
    this.service.getProduct().subscribe((response: any) => {
      this.products = response.data;
    });
  }

  ngOnInit(): void {}
}
