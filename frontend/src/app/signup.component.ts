import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonServiceService } from './common-service.service';

@Component({
  selector: 'app-signup',
  template: `
    <div class="login_Big">
      <h1>Sign up</h1>
      <div class="login__style">
        <form [formGroup]="signUpForm" (ngSubmit)="createUser()">
          <h3>Name</h3>
          <input placeholder="name" formControlName="name" />
          <h3>Email</h3>
          <input placeholder="email" formControlName="email" />
          <h3>Password</h3>
          <input placeholder="password" formControlName="password" />
          <h3>Role</h3>
          <input placeholder="role" formControlName="role" />
          <button
            class="login__Btn1"
            type="submit"
            [disabled]="!signUpForm.valid"
          >
            signup
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
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  subscribe: Subscription | undefined;
  constructor(
    private formbuilder: FormBuilder,
    private service: CommonServiceService
  ) {
    this.signUpForm = this.formbuilder.group({
      name: ['emily', Validators.required],
      email: ['e@gmail', [Validators.required, Validators.email]],
      password: ['123abcd', Validators.required],
      role: ['user', Validators.required],
    });
  }
  createUser() {
    this.service.signUpUser(this.signUpForm.value).subscribe((response) => {});
  }

  ngOnInit(): void {}
}
