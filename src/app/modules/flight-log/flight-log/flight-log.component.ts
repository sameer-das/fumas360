import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatEndDate, MatStartDate } from '@angular/material/datepicker';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, last, map, startWith, takeLast, tap } from 'rxjs/operators';

@Component({
  selector: 'app-flight-log',
  templateUrl: './flight-log.component.html',
  styleUrls: ['./flight-log.component.css'],
})
export class FlightLogComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  dateRange: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  searchbar: FormControl = new FormControl();
  filterBy: FormControl = new FormControl('-1');

  dateRangeValueChanges$ = this.dateRange.valueChanges.pipe(
    startWith({ startDate: '', endDate: '' }),
    map(v => {
      return {startDate: v.startDate ? v.startDate.toDate() : '', endDate: v.endDate ? v.endDate.toDate() : ''}
    })
  );

  arr: number[] = Array.from(Array(50).keys());
  constructor(private _router: ActivatedRoute) {}
  initialPage: PageEvent = {
    previousPageIndex: -1,
    pageIndex: 0,
    pageSize: 10,
    length: 100,
  };
  mysubject$: BehaviorSubject<PageEvent> = new BehaviorSubject(
    this.initialPage
  );
  searchSubject$: BehaviorSubject<string> = new BehaviorSubject('');
  filterDropDownSubject$: BehaviorSubject<string> = new BehaviorSubject('-1');

  routerData$ = combineLatest([
    this._router.data.pipe(map((x) => x.flightlist.data)),
    this.searchSubject$,
    this.filterDropDownSubject$,
    this.dateRangeValueChanges$
  ]).pipe(
    map(([d, s, f,dr]) => {
      let filteredData = [];
      if (f == '-1') filteredData = [...d];
      else filteredData = d.filter((curr: any) => curr.posted === +f);

      if(dr.startDate && dr.endDate ) {
        filteredData = filteredData.filter((curr:any) => {
          return curr.tdate.getTime() >= dr.startDate.getTime() && 
          curr.tdate.getTime() <= dr.endDate.getTime()
        });        
      }
        

      if (s)
        return filteredData.filter((_: any) =>
          _.name.toLowerCase().includes(s.toLowerCase()) || 
          _.orderno.toLowerCase().includes(s.toLowerCase()) ||
          _.flightreg.toLowerCase().includes(s.toLowerCase()) 
        );
      else return filteredData;
    })
  );
  data$ = combineLatest([this.routerData$, this.mysubject$]).pipe(
    map(([routerdata, pagedata]) => {
      const start = pagedata.pageSize * pagedata.pageIndex;
      const end = start + pagedata.pageSize;
      return routerdata.slice(start, end);
    })
  );

  ngOnInit(): void {
    this.searchbar.valueChanges.subscribe(this.searchSubject$);
    this.filterBy.valueChanges.subscribe(this.filterDropDownSubject$);
    this.dateRangeValueChanges$.subscribe((d) => {
      console.log(d);
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(this.mysubject$);
  }

  clearFilters() {
    this.searchbar.setValue('');
    this.filterBy.setValue('-1');
    this.dateRange.patchValue({
      startDate: '',
      endDate: '',
    });
  }
}
