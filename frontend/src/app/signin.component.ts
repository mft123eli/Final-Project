import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './common-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  template: ` <div class="login_Big">
    <h1>Sign In</h1>
    <div class="login__style">
      <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
        <h3>Email</h3>
        <input placeholder="email" formControlName="email" />
        <h3>password</h3>
        <input placeholder="password" formControlName="password" />
        <button class="login__Btn1" type="submit" [disabled]="!loginForm.valid">
          login
        </button>
        <p>
          By signing-in you agree to the Emi&EliCookWare to obey the law by
          following guide and rules. Contact us or see or privacy policy.
        </p>
        <button class="login__signUp" (click)="newAccount()">
          Create your Emi&EliCookWare Account
        </button>
      </form>
    </div>
  </div>`,
  styles: [
    `
      .login_Big {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .text {
        font-size: 20px;
      }
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
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  decoded: any;
  subscribe: Subscription | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CommonServiceService
  ) {
    this.loginForm = this.fb.group({
      email: ['e@gmail', [Validators.required, Validators.email]],
      password: ['123abcd', Validators.required],
    });
  }
  onLogin() {
    this.subscribe = this.service
      .loginUser(this.loginForm.value)
      .subscribe((response) => {
        this.service.usertoken = response;

        this.decoded = jwt_decode(this.service.usertoken.data);

        if (this.decoded.role === 'user') {
          this.router.navigate(['user', 'home']);
        } else {
          this.router.navigate(['admin', 'list']);
        }
      });
  }
  newAccount() {
    this.router.navigate(['signup']);
  }
  ngOnInit(): void {}
}
