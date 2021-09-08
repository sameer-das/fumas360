import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FlightLogService } from '../services/flight-log.service';

@Injectable()
export class FlightLogResolverService implements Resolve<any> {

  constructor(private _flightLogService: FlightLogService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
      return this._flightLogService.getFlightList;
} 
}
