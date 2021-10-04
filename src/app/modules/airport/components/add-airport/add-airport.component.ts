import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css']
})
export class AddAirportComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }
  file!:File | null | undefined;
  @ViewChild('fileInput') fileInputRef!: ElementRef;
  countries!: {acountry: string}[];


  airportFormGroup: FormGroup = new FormGroup({
    aname: new FormControl(),
    idntfr: new FormControl(),
    iata: new FormControl(),
    ccustoms: new FormControl(),
    cnoise: new FormControl(),
    clighted: new FormControl(),
    acountry: new FormControl(),
    astate: new FormControl(),
    aLat: new FormControl(),
    aLatn: new FormControl(),
    aLong: new FormControl(),
    aLonge: new FormControl(),
    aElevtn: new FormControl(),
    arLength: new FormControl(),
    aRwidth: new FormControl(),
    surface: new FormControl(),
    aTimeZ: new FormControl(),
    status: new FormControl(),
    aRemarks: new FormControl(),
    cAvgas: new FormControl(),
    cJetFuel: new FormControl(),
    rPublic: new FormControl(),
  });

  ngOnInit(): void {

    this._route.data.subscribe((data) => {
      if(data.airportdata){
        console.log(data.airportdata)
        this.countries = data.airportdata.data.countrys;
        this.airportFormGroup.patchValue({...data.airportdata.data,
          cnoise: !!data.airportdata.data.cnoise,
          ccustoms: !!data.airportdata.data.ccustoms,
          clighted: !!data.airportdata.data.clighted,
          cAvgas: !!data.airportdata.data.cAvgas,
          cJetFuel: !!data.airportdata.data.cJetFuel,
          rPublic: String(data.airportdata.data.rPublic),
        })
      }
      
    });
  }

  

  onSave():void {
    const obj = {...this.airportFormGroup.value, file: this.file}
    console.log(obj)
    // console.log(this.airportFormGroup.value)
  }

  onFileUpload(event: Event) {
    const input = <HTMLInputElement>event.target;
    console.log(input)
    this.file = input.files?.item(0);
  }

  onFileDelete() {
    if(this.file) {
      this.file = undefined;
      this.fileInputRef.nativeElement.value = null;
    }
  }

}
