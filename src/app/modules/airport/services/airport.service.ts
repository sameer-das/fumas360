import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private _http: HttpClient) { }
  airPortList$ = this._http.get(`http://101.53.147.38/MyPortal/api/Flight/Airports`).pipe(
    map((x:any) => x.data),
    shareReplay()
  )
}
