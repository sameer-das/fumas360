import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-log',
  templateUrl: './flight-log.component.html',
  styleUrls: ['./flight-log.component.css']
})
export class FlightLogComponent implements OnInit {
  arr: number[] = Array.from(Array(50).keys());
  constructor() { }

  ngOnInit(): void {
    console.log(this.arr)
  }

}
