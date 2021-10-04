import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddAirportService implements Resolve<any>{

  constructor(private _http:HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(route.queryParams.airportid)
     return this._http.get(`http://101.53.147.38/MyPortal/api/Flight/GetAirportDetails?Id=${route.queryParams.airportid}`)
    return of(null);
  }

}
