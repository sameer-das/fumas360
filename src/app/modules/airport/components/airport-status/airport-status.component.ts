import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-airport-status',
  templateUrl: './airport-status.component.html',
  styleUrls: ['./airport-status.component.css']
})
export class AirportStatusComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }
  // simpleUrl: string = this._route.snapshot.data.fileData;
  simpleUrl:string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  ngOnInit(): void {

    console.log(this._route.snapshot.data)  
  }

}
