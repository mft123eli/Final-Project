import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './users';
import { Product } from './products';
@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  usertoken: any;
  products: Array<Product> = [];
  cartLists: Array<any> = [];
  totalPrice: number = 0;
  totalItem: number = 0;

  constructor(private http: HttpClient) {}
  signUpUser(body: User) {
    return this.http.post(`http://localhost:3000/users/signup`, body);
  }
  loginUser(body: User) {
    return this.http.post(`http://localhost:3000/users/login`, body);
  }
  addProductService(body: Product) {
    return this.http.post(`http://localhost:3000/products`, body);
  }
  addPicture(formData: any) {
    return this.http.post(`http://localhost:3000/products/file`, formData);
  }
  getProduct(query?: any) {
    if (query) {
      return this.http.get(`http://localhost:3000/products/?search=${query}`);
    } else {
      return this.http.get(`http://localhost:3000/products`);
    }
  }
  removeProduct(_id: String) {
    return this.http.delete(`http://localhost:3000/products/${_id}`);
  }
  updateProduct(_id: any, body: Product) {
    return this.http.put(`http://localhost:3000/products/${_id}`, body);
  }
  addToCartService(product: Product) {
    const findProductIndex: any = this.cartLists.findIndex((p) => {
      return p._id === product._id;
    });
    if (findProductIndex === -1) {
      this.cartLists.push({ ...product, quantity: 1, total: product.price });
    } else {
      this.cartLists[findProductIndex].quantity += 1;

      this.cartLists[findProductIndex].total += product.price;
    }

    localStorage.setItem('cartLists', JSON.stringify(this.cartLists));
  }

  addOrder(body: any) {
    return this.http.post(`http://localhost:3000/orders`, body);
  }
  makePaymentProduct(stripeToken: any) {
    return this.http.post('http://localhost:3000/checkout', {
      token: stripeToken,
    });
  }
}
