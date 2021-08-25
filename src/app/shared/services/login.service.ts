import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }
  module_data : any[] = [];

  checkCredentials(userid:string,password:string):Observable<UserAuthData> {

    const obj = {
      "UserId":userid,
      "Password":password
    };

    return this._http.post<LoginAPIResponse>('http://101.53.147.38/MyPortal/api/Home/ValidateUser',obj)
    .pipe(tap((response:LoginAPIResponse) => {
      // console.log(response);
      if(response.code == 200 && response.status.toLowerCase() === 'success') {
        response.data.modules.forEach(element => {    
          const obj:any = {}
          obj['name'] = element.name;    
          obj['children'] = [];
          element.subModules.forEach((subModule:any) => {
            obj.children.push({'name': subModule.name,'children':[...subModule.actionItems]})
          });
          this.module_data.push(obj)
        });
      }      
      console.log(this.module_data);
    }),
    map((response:LoginAPIResponse) => {
      if(response.code == 200 && response.status.toLowerCase() === 'success'){
        return {
          jwt: 'my_jwt_goes_here',
          error: null,
          success: true
        }
      } else {
        return {
          jwt: '',
        error: 'Authenticaion Error',
        success: false
        }
      }
    }))
  }
}

export interface UserAuthData {
  jwt: string;
  error: string | null;
  success: boolean;
}


export interface LoginAPIResponse {
  code: number;
  data: {modules:any[]},
  status: string
}
