import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { CheckroleGuard } from './checkrole.guard';
import { CheckTokenGuard } from './check-token.guard';
import { TokeAutInterceptor } from './toke-aut.interceptor';

@NgModule({
  declarations: [AppComponent, SigninComponent, SignupComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: SigninComponent },
      { path: 'home', component: HomeComponent },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((module) => module.AdminModule),
        canActivate: [CheckroleGuard, CheckTokenGuard],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((module) => module.UserModule),
        canActivate: [CheckTokenGuard],
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokeAutInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
