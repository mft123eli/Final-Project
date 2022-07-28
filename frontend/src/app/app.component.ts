import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from './common-service.service';
@Component({
  selector: 'app-root',
  template: ` <div *ngIf="!token">
      <a [routerLink]="['home']"> WELL COME HOME </a>
      <a [routerLink]="['signup']"> SIGN UP HERE </a>
      <a [routerLink]="['login']"> SIGN IN HERE </a>
      <button (click)="logout()">Logout</button>
    </div>
    <div *ngIf="token">
      <a [routerLink]="['user', 'home']"> user </a>
      <a [routerLink]="['admin', 'list']"> admin </a>
    </div>
    <router-outlet></router-outlet>`,
  styles: [
    `
      a {
        margin-right: 25px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'frontend';
  token!: any;
  constructor(private router: Router, private service: CommonServiceService) {
    console.log(this.service.usertoken, 'aaaaa');
    this.token = this.service.usertoken?.data;
  }

  logout() {
    this.service.usertoken = null;
    this.token = null;
    this.router.navigate(['home']);
  }
}
