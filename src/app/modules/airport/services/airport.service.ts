import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private _http: HttpClient) { }
  airPortList$ = this._http.get(`${environment.API_BASE_URL}/Flight/Airports`).pipe(
    map((x:any) => x.data),
    // shareReplay(1)
  )


  uploadFile(file:File):Observable<any> {
    const formData:FormData = new FormData();
    formData.append('airportfile', file, file.name);
    return this._http.post(`${environment.API_BASE_URL}/Flight/Upload`,formData);
  }

  saveData(data:any):Observable<any> {
    return this._http.post(`${environment.API_BASE_URL}/Flight/AirportOperations`,data);
  }


  getPDF(filename: string): Observable<any> {
    return this._http.get(`${environment.API_BASE_URL}/Flight/Download?fileName=${filename}`)
  }
}
