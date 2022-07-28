import { Component, OnInit, Input } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import { Product } from '../products';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <h1>Well come to Emi&EliCookWare</h1>
    </div>
    <header>
      <div class="navbar navbar-dark bg-secondary shadow-sm">
        <div class="navbar-brand align-item-center d-flex">
          <img class="header__logoP" src="assets/cookShopimg.webp" />
          <img class="header__logoP" src="assets/cookShopimg.webp" />
          <img class="header__logoP" src="assets/cookShopimg.webp" />
          <img class="header__logoP" src="assets/cookShopimg.webp" />
        </div>
        <input
          type="text"
          name="search-box"
          class="search-box"
          placeholder="Search for products"
          #search
          (keyup)="sendData(search.value)"
        />
        <button routerLink="/user/check" class="btn btn-primary">
          <i class="fa fa-shopping-cart fa-5x"> {{ cartLists.length }} </i>
        </button>
      </div>
    </header>
    <section class="search-results">
      <p *ngIf="products.length < 1 && hasQuery">
        Sorry. there is no match product found
      </p>
      <ng-template ngFor let-product [ngForOf]="products" let-i="index">
      </ng-template>
    </section>
    <app-onelist *ngFor="let product of products" [product]="product">
    </app-onelist>
  `,
  styles: [
    `
      .header {
        text-align: center;
        padding: 0px 0;
        background-color: pink;
        font-size: 2.3rems;
      }
      .search-box {
        display: block;
        margin: 40px auto 0 auto;
        padding: 10px 20px;
        max-width: 600px;
        width: 95%;
      }
      .search-results {
        max-width: 600px;
        width: 65%;
        margin: 20px auto 0 auto;
        hr {
          border: none;
          height: 1px;
          background-color: lightgray;
        }
        p {
          margin: 10px 0;
        }
      }
      .header__logo {
        width: 150px;
        height: 150px;
        object-fit: contain;
        margin: 0 0px;
        margin-top: 0px;
      }

      .header__logoP {
        width: 150px;
        height: 100px;
        object-fit: contain;
        margin: 0 0px;
        margin-top: 0px;
      }
      h1 {
        text-align: center;
      }
      .card {
        margin: 25px;
        padding: 25px;
        width: 200%;
      }
      .card img {
        width: 900px;
        height: 200px;
        margin-bottom: 15px;
        transition: 0.3s ease-in-out;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  @Input() product!: Product;
  products: Array<Product> = [];
  hasQuery: Boolean = false;
  list: Boolean = false;
  productImg: string = '';
  cartLists: Array<Product> = [];
  subscribe: Subscription | undefined;
  constructor(private service: CommonServiceService) {}

  sendData(val: any) {
    let query = val;
    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this.products = [];
    }
    this.service.getProduct(query.trim()).subscribe((response: any) => {
      this.products = response.data;
      this.hasQuery = true;
    });
  }

  ngOnInit(): void {
    this.service.getProduct().subscribe((response: any) => {
      this.products = [];
      this.products = response.data;
    });
    this.cartLists = this.service.cartLists;
  }
}
