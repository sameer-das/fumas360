import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  arr: number[] = Array.from(Array(5).keys());

  constructor() { }

  ngOnInit(): void {
    
  }

}
