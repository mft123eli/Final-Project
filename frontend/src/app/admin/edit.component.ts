import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonServiceService } from '../common-service.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  template: `
    <div class="login_Big">
      <h1>Update the product page</h1>
      <div class="login__style">
        <form [formGroup]="editProductForm" (ngSubmit)="editProduct()">
          Name: <input placeholder="name" formControlName="name" /> <br />
          Price: <input placeholder="price" formControlName="price" /> <br />
          <button
            class="login__signUp"
            type="submit"
            [disabled]="!editProductForm"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .login__style {
        width: 300px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        padding: 20px;
      }
      .login__Btn1 {
        background: #f0c14b;
        border-radius: 2px;
        width: 100%;
        height: 35px;
        border: 1px solid;
        margin-top: 10px;
      }
      input {
        width: 100%;
        height: 30px;
        background-color: white;
      }
      .login__signUp {
        border-radius: 2px;
        width: 100%;
        height: 35px;
        border: 1px solid;
        margin-top: 10px;
        border-color: darkgray;
      }
    `,
  ],
})
export class EditComponent implements OnInit {
  _id!: any;
  editProductForm!: FormGroup;
  subscribe: Subscription | undefined;
  productValue: any;
  constructor(
    private fb: FormBuilder,
    private service: CommonServiceService,
    private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.subscribe = this.activateRoute.paramMap.subscribe((params) => {
      this._id = params.get('_id');

      this.productValue = this.service.products.find((pro: any) => {
        pro._id === this._id;
        this.editProductForm.controls['name'].setValue(this.productValue.name);
        this.editProductForm.controls['price'].setValue(
          this.productValue.price
        );
      });
    });
  }
  editProduct() {
    this.service
      .updateProduct(this._id, this.editProductForm.value)
      .subscribe((response: any) => {});
    this.router.navigate(['admin', 'list']);
  }
  ngOnInit(): void {}
}
