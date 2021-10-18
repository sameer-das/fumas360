import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class FlightListService {

  constructor(private _http:HttpClient) { }
  private _dropdownDataURL = `${environment.API_BASE_URL}/Flight/LoadFlightLogs`;
  private _saveLog = `${environment.API_BASE_URL}/Flight/FlightLogOperations`

  getFlightDetails(ordno:string):Observable<any>{
    return this._http.get(`${environment.API_BASE_URL}/Flight/GetFlightLogDetails?ORDNO=${ordno}`)
  }
  getDropdownData = this._http.get(this._dropdownDataURL);

  postFlightLogOperations(body: any):Observable<any> {
    return this._http.post(this._saveLog, body);
  }
}
