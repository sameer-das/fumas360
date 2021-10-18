import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AirportService } from '../services/airport.service';

@Injectable({
  providedIn: 'root'
})
export class AirportStatusService implements Resolve<any>{

  constructor(private _http:HttpClient, private _airportService: AirportService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Observable<null>{
    if(route.queryParams.fname) {
        console.log(route.queryParams.fname);
        return this._airportService.getPDF(route.queryParams.fname).pipe(
            tap((pdf) => {
                // console.log(pdf)
            }),
            map((pdfResp: any) => {
                return 'data:application/pdf;base64,' + pdfResp.data + '#toolbar=0';
            })
         )
    } else{
        return of(null)
    }
  }

}


