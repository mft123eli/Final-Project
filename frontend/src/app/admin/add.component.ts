import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonServiceService } from '../common-service.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../products';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  template: `
    <div class="login_Big">
      <h1>Add product</h1>
      <br />
      <div class="login__style">
        <form [formGroup]="addProductForm" (ngSubmit)="addProduct()">
          <h3>Upload Photo Here</h3>
          <input
            class="form-input"
            type="file"
            formControlName="img"
            (change)="getImage($event)"
          />
          <br />
          <h3>Name</h3>
          <input placeholder="name" formControlName="name" /> <br />
          <h3>Price</h3>
          <input placeholder="price" formControlName="price" /> <br />
          <button
            class="login__Btn1"
            type="submit"
            [disabled]="!addProductForm.valid"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .form-input {
        width: 40%;
        height: 40%;
      }
      .login__style {
        width: 300px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        padding: 20px;
      }

      .login_Big {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
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
    `,
  ],
})
export class AddComponent implements OnInit {
  addProductForm!: FormGroup;
  subscribe: Subscription | undefined;
  picture!: any;
  uploaded = false;
  imgString: string = '';
  constructor(
    private fb: FormBuilder,
    private service: CommonServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.addProductForm = this.fb.group({
      name: ['cook', Validators.required],
      price: ['100', Validators.required],
      img: ['', Validators.required],
    });
  }
  addProduct() {
    const { name, price } = this.addProductForm.value;
    const newProduct = <Product>{
      name,
      price,
      img: this.imgString,
    };
    this.subscribe = this.service
      .addProductService(newProduct)
      .subscribe((res: any) => {
        this.service.products.push(res.data);
      });
    this.router.navigate(['admin', 'list']);
  }

  getImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.picture = file;
      this.onUpload();
    }
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.picture);
    this.service.addPicture(formData).subscribe((response: any) => {
      if (response.success) {
        this.imgString = response.data.filename;
        this.uploaded = true;
      }
    });
  }

  ngOnInit(): void {}
}
