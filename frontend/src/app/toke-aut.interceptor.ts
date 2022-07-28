import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokeAutInterceptor implements HttpInterceptor {
  token: any;
  constructor(private service: CommonServiceService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.token = this.service.usertoken?.data;
    const tokenCheck = request.clone({
      headers: request.headers.set('authorization', 'Bearer ' + this.token),
    });
    return next.handle(tokenCheck);
  }
}
