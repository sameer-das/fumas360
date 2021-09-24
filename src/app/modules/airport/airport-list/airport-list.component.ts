import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter, last, map, startWith, takeLast, tap } from 'rxjs/operators';
@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit , AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(null);
  }
}
