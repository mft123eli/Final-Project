import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';
@Component({
  selector: 'app-payments',
  template: ` <p>payments works!</p>
    <button (click)="makePayment(10)">Pay</button>`,
  styles: [],
})
export class PaymentsComponent implements OnInit {
  paymentHandler: any = null;
  totalPrice: number = 0;
  constructor(private service: CommonServiceService) {
    this.totalPrice = this.service.totalPrice;
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LPsJtApm4xUqhyJZCHQziGf4qYTK8oHDPlOW9d8pafLOZK2BS1YHiN7Y1xIgbA1ki1qRlFYrGcnVz5RNp2cuUhy00ERLU4ZKr',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentsStripeHandler(stripeToken);
      },
    });
    const paymentsStripeHandler = (stripeToken: any) => {
      this.service.makePaymentProduct(stripeToken).subscribe((data: any) => {
        console.log(data, 'ttttttttttttt');
      });
    };
    paymentHandler.open({
      name: 'EBE CookWare shopping',
      description: 'amazing kitchen staff',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LPsJtApm4xUqhyJZCHQziGf4qYTK8oHDPlOW9d8pafLOZK2BS1YHiN7Y1xIgbA1ki1qRlFYrGcnVz5RNp2cuUhy00ERLU4ZKr',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  ngOnInit(): void {
    this.invokeStripe();
  }
}
