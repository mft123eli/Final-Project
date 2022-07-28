import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './common-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  template: `
    <h1>
      <strong>Well come to Emi&EliCookWare</strong>
      <img class="header__logo" src="assets/cookShopimg.webp" />
      <img class="header__logo" src="assets/cookShopimg.webp" />
      <img class="header__logo" src="assets/cookShopimg.webp" />
      <img class="header__logo" src="assets/cookShopimg.webp" />
      <button class="login__Btn1" (click)="signinHere()">signIn/signup</button>
    </h1>

    <img class="bg" src="assets/cookwareBackGround.webp" />
  `,
  styles: [
    `
      .header__logo {
        width: 200px;
        height: 200px;
        object-fit: contain;
        margin: 0 10px;
        margin-top: 0px;
      }
      .bg {
        width: 100%;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private service: CommonServiceService) {}
  signinHere() {
    this.router.navigate(['login']);
  }
  ngOnInit(): void {}
}
