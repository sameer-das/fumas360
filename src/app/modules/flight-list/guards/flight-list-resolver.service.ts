import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { FlightListService } from '../services/flight-list.service';

@Injectable()
export class FlightListResolverService implements Resolve<any>{

  constructor(private _flighlistService:FlightListService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(route.queryParams.ordno)
      return this._flighlistService.getFlightDetails(route.queryParams.ordno)
    else 
      return 0;
  }
}
@Injectable()
export class DropdownDataResolver implements Resolve<any> {
  constructor(private _flighlistService:FlightListService) { }
  resolve() {
    return this._flighlistService.getDropdownData;
  }
}
