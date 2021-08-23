import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }

  checkCredentials(userid:string,password:string):Observable<UserAuthData> {
    if(userid.toLowerCase() === 'admin' && password.toLowerCase() === 'admin')
      return of({
        jwt: 'my_jwt_goes_here',
        error: null,
        success: true
      })
    else 
      return of({
        jwt: '',
        error: 'Authenticaion Error',
        success: false
      })
  }
}

export interface UserAuthData {
  jwt: string;
  error: string | null;
  success: boolean;
}
