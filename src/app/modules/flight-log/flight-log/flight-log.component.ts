import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { FlightLogServiceService } from '../services/flight-log-service.service';

@Component({
  selector: 'app-flight-log',
  templateUrl: './flight-log.component.html',
  styleUrls: ['./flight-log.component.css']
})
export class FlightLogComponent implements OnInit,AfterViewInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  arr: number[] = Array.from(Array(50).keys());
  constructor(private _flightLogService: FlightLogServiceService) { }
  data = this._flightLogService.getFlightList;
  ngOnInit(): void {
    this.mysubject.subscribe(data => {
      console.log(data);
    })
  }
  mysubject: BehaviorSubject<any> = new BehaviorSubject(
    {previousPageIndex: 0, pageIndex: 1, pageSize: 10, length: 100}
  );

  ngAfterViewInit() {
    // console.log(this.paginator)
    this.paginator.page.subscribe(this.mysubject) 
  }
  

}
