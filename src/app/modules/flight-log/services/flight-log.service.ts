import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable()
export class FlightLogService {

  constructor(private _http: HttpClient) { }
  private URL: string =  `${environment.API_BASE_URL}/Flight/FlightLogs`
  getFlightList = this._http.get(this.URL).pipe(
    map((resp:any) => {
      return {
        ...resp,
        data: resp.data.map((curr: any) => {
          return {
            orderno: curr.orderno,
            flightreg: curr.flightreg,
            name: curr.name,
            tdate: new Date(curr.tdate),
            posted: curr.posted,
            fltTime: curr.totalairtime,
            blkTime: curr.totalflighttime  
          }
        })
      }
    }),
    // shareReplay()
    );

}
