import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root',
})
export class CheckTokenGuard implements CanActivate {
  token: any;
  constructor(private http: HttpClient, private service: CommonServiceService) {
    this.token = this.service.usertoken.data;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }
}
