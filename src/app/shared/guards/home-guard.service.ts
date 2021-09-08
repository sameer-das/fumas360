import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor(private _router: Router, private _loginService: LoginService) { }
  
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('in home guard' , this._loginService.module_data.length)
    // if(localStorage.getItem('auth'))
    //   return of(true)
    // else  
    //   return this._router.createUrlTree(['login']);
    return true;
  }

}
