import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CommonServiceService } from './common-service.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class CheckroleGuard implements CanActivate {
  decodedtoken!: any;
  constructor(private http: HttpClient, private service: CommonServiceService) {
    this.decodedtoken = jwtDecode(this.service.usertoken.data);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.decodedtoken.role === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
