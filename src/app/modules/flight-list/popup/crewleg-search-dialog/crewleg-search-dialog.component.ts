
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-crewleg-search-dialog',
  templateUrl: './crewleg-search-dialog.component.html',
  styleUrls: ['./crewleg-search-dialog.component.css']
})
export class CrewlegSearchDialogComponent implements OnInit {
  selectedCrew!: any;
  search: FormControl = new FormControl();
  constructor(@Inject(MAT_DIALOG_DATA) private _crewLeg$: Observable<any>,
    private dialogRef: MatDialogRef<CrewlegSearchDialogComponent>
  ) { }

  _search$ = this.search.valueChanges.pipe(startWith(''));

  crewLeg$: Observable<any> =  combineLatest([this._search$, this._crewLeg$]).pipe(
    map(([s,c]) => {
      if(s) {
        return c.filter((x:any) => {
          return x.nmroute.toLowerCase().includes(s.toLowerCase()) || 
          x.rfrm.toLowerCase().includes(s.toLowerCase()) || 
          x.rto.toLowerCase().includes(s.toLowerCase()) || 
          x.altto.toLowerCase().includes(s.toLowerCase())
        })
      } else return c;
    })
  )

 
  ngOnInit(): void {}


  onRowSelect(c: any){
    this.selectedCrew = {...c};
  } 
  onSelection() {
  this.dialogRef.close({data: this.selectedCrew});
  }
}
