import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header.component';
import { ListComponent } from './list.component';
import { OnelistComponent } from './onelist.component';
import { NavbarComponent } from './navbar.component';
import { CheckoutComponent } from './checkout.component';
import { OrderComponent } from './order.component';
import { PaymentsComponent } from './payments.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ListComponent,
    OnelistComponent,
    NavbarComponent,
    CheckoutComponent,
    OrderComponent,
    PaymentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'nav',
        component: NavbarComponent,
      },
      {
        path: 'check',
        component: CheckoutComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'pay',
        component: PaymentsComponent,
      },
    ]),
  ],
})
export class UserModule {}
