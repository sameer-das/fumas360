import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter, last, map, startWith, takeLast, tap } from 'rxjs/operators';
import { ViewPdfComponent } from '../popup/view-pdf/view-pdf.component';
@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit , AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(null);
  }


  showPdf() {
    const dialogRef = this.dialog.open(ViewPdfComponent)
  }
}
