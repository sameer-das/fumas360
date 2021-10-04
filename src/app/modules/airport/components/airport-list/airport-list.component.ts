import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ViewPdfComponent } from '../../popup/view-pdf/view-pdf.component';
import { AirportService } from '../../services/airport.service';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.css']
})
export class AirportListComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private _airportService:AirportService) { }
    private initialPage: PageEvent = {
      previousPageIndex: -1,
      pageIndex: 0,
      pageSize: 10,
      length: 100,
    };
    private paginate$ = new BehaviorSubject<PageEvent>(this.initialPage)

  airPortdata$ = this._airportService.airPortList$;

  date = new Date();

  search:FormControl = new FormControl();
  search$ = this.search.valueChanges.pipe(startWith(''));
  data$ = combineLatest([this.airPortdata$,this.search$]).pipe(
    map(([airports, search]) => {      
      if(search)
        return airports.filter((a:any) => {
          return a.aname.toLowerCase().includes(search.toLowerCase()) ||
           a.idntfr.toLowerCase().includes(search.toLowerCase()) ||
           a.acountry.toLowerCase().includes(search.toLowerCase()) 
        });
      return airports;
    }))

  airPortList$ = combineLatest([this.data$,  this.paginate$]).pipe(
    map(([data,page]) => {
      const start = page.pageSize * page.pageIndex;
      const end = start + page.pageSize;
      return data.slice(start, end);
    })
  )

  ngOnInit(): void {
    
  }

  
  
  onPaginate(e:PageEvent) {
    this.paginate$.next(e);
  }



  showPdf() {
    const dialogRef = this.dialog.open(ViewPdfComponent)
  }
}
