import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FlightListService {

  constructor(private _http:HttpClient) { }
  private _dropdownDataURL = `http://101.53.147.38/MyPortal/api/Flight/LoadFlightLogs`;
  private _saveLog = `http://101.53.147.38/MyPortal/api/Flight/FlightLogOperations`

  getFlightDetails(ordno:string):Observable<any>{
    return this._http.get(`http://101.53.147.38/MyPortal/api/Flight/GetFlightLogDetails?ORDNO=${ordno}`)
  }
  getDropdownData = this._http.get(this._dropdownDataURL);

  postFlightLogOperations(body: any):Observable<any> {
    return this._http.post(this._saveLog, body);
  }
}
