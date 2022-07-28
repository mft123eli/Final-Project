import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../products';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
@Component({
  selector: 'app-oneproduct',
  template: `
    <h2>Home cookware</h2>
    <div class="container">
      <div class="row">
        <div class="card col-md-3">
          <img class="productImg" [src]="productImg" /><br />
          Name: {{ product.name }}<br />
          Price: {{ product.price }}<br />
          <button (click)="addProduct()">Add</button>
          <button (click)="updateProduct(product)">Edit</button>
          <button (click)="deleteProduct()">delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class OneproductComponent implements OnInit {
  @Input() product!: Product;
  productImg: string = '';
  products!: Array<Product>;

  constructor(private router: Router, private service: CommonServiceService) {
    this.products = this.service.products;
  }
  addProduct() {
    this.router.navigate(['admin', 'add']);
  }
  updateProduct(product: Product) {
    this.router.navigate(['admin', 'edit', product._id]);
  }
  deleteProduct() {
    this.service.removeProduct(this.product._id).subscribe((response: any) => {
      const product = response.data;
    });

    const findProductIndex = this.service.products.findIndex((product) => {
      product._id === this.product._id;
    });
    this.service.products.splice(findProductIndex, 1);
  }
  ngOnInit(): void {
    this.productImg = `http://localhost:3000/uploads/${this.product.img}`;
  }
}
