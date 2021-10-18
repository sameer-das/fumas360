import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddAirportService implements Resolve<any>{

  constructor(private _http:HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(route.queryParams.airportid)
     return this._http.get(`${environment.API_BASE_URL}/Flight/GetAirportDetails?Id=${route.queryParams.airportid}`)
    return this._http.get(`${environment.API_BASE_URL}/Flight/GetAirportDetails?Id=0`).pipe(
      map(resp => {
        return { ...resp, new: true}
      })
    )
  }

}


