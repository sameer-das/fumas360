import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AlertPopupComponent } from 'src/app/shared/components/alert-popup/alert-popup.component';
import { AirportService } from '../../services/airport.service';
@Component({
  selector: 'app-add-airport',
  templateUrl: './add-airport.component.html',
  styleUrls: ['./add-airport.component.css']
})
export class AddAirportComponent implements OnInit, OnDestroy {

  constructor(private _route: ActivatedRoute, private dialog: MatDialog, private _airportService:AirportService) { }
  file!:File | null | undefined;
  @ViewChild('fileInput') fileInputRef!: ElementRef;
  countries!: {acountry: string}[];
  airportDataSubscription!: Subscription;
  isEdit:boolean = false;
  aid: number = 0;
  noname: string = '';

  editFilename!: string;

  airportFormGroup: FormGroup = new FormGroup({
    aname: new FormControl('', Validators.required),
    idntfr: new FormControl('', Validators.required),
    iata: new FormControl(''),
    ccustoms: new FormControl(),
    cnoise: new FormControl(),
    clighted: new FormControl(),
    acountry: new FormControl('', Validators.required),
    astate: new FormControl(''),
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
    rPublic: new FormControl('1'),
  });

  ngOnInit(): void {

    this.airportDataSubscription = this._route.data.subscribe((data) => {
      if(!('new' in data.airportdata)){
        console.log(data.airportdata)
        this.isEdit = true;
        this.editFilename =  data.airportdata.data.filename;
        this.aid = data.airportdata.data.aid;
        this.noname = data.airportdata.data.aname;
        this.countries = data.airportdata.data.countrys;

        this.airportFormGroup.patchValue({...data.airportdata.data,
          cnoise: !!data.airportdata.data.cnoise,
          ccustoms: !!data.airportdata.data.ccustoms,
          clighted: !!data.airportdata.data.clighted,
          cAvgas: !!data.airportdata.data.cAvgas,
          cJetFuel: !!data.airportdata.data.cJetFuel,
          rPublic: String(data.airportdata.data.rPublic),
          
        })

      } else {
        console.log('new mode')
        this.countries = data.airportdata.data.countrys;
      }  
    });
  }

  

  onSave():void {
   const obj =  {
    "Idntfr":this.airportFormGroup.value.idntfr,
    "Iata":this.airportFormGroup.value.iata,
    "Aname":this.airportFormGroup.value.aname,
    "Anameold":this.isEdit ? this.airportFormGroup.value.aname : '',
    "Astate":this.airportFormGroup.value.astate,
    "Acountry":this.airportFormGroup.value.acountry,
    "ALat":this.airportFormGroup.value.aLat,
    "ALong":this.airportFormGroup.value.aLong,
    "AElevtn":this.airportFormGroup.value.aElevtn,
    "ARwidth":this.airportFormGroup.value.aRwidth,
    "ARLength":this.airportFormGroup.value.arLength,
    "Avariatn":"",
    "ATimeZ":String(this.airportFormGroup.value.aTimeZ),
    "ARemarks":this.airportFormGroup.value.aRemarks,
    "ALatn":this.airportFormGroup.value.aLatn,
    "ALonge":this.airportFormGroup.value.aLonge,
    "surface":String(this.airportFormGroup.value.surface),
    "ccustoms":+this.airportFormGroup.value.ccustoms,
    "cnoise":+this.airportFormGroup.value.cnoise,
    "clighted":+this.airportFormGroup.value.clighted,
    "CAvgas":+this.airportFormGroup.value.cAvgas,
    "CJetFuel":+this.airportFormGroup.value.cJetFuel,
    "rPublic":+this.airportFormGroup.value.rPublic,
    "aid": this.aid,
    "status":this.airportFormGroup.value.status,
    "filename": ''
    }

    if(this.file) {
      this._airportService.uploadFile(this.file).subscribe((fileuploadResp: any) => {
        console.log(fileuploadResp)
        if(fileuploadResp.code !== 200) {
          this.openAlertPopup(fileuploadResp.data)
        } else {
          obj.filename = fileuploadResp.data.split('\\')[2];
          console.log(obj);
          this._airportService.saveData(obj).subscribe((saveResp:any) => {
            if(saveResp.code === 200) {
              this.openSuccessPopup(saveResp.data)
            } else {
              this.openAlertPopup(saveResp.data);
            }
          })
        }
      })
    } else {
      this._airportService.saveData(obj).subscribe((saveResp:any) => {
        if(saveResp.code === 200) {
          this.openSuccessPopup(saveResp.data)
        } else {
          this.openAlertPopup(saveResp.data);
        }
      })
    }
  }

  onFileUpload(event: Event) {
    const input = <HTMLInputElement>event.target;
    if(input.files && input.files?.item(0)?.type !== 'application/pdf'){
      this.file = undefined;
      this.fileInputRef.nativeElement.value = null;
      this.openAlertPopup('Invalid file format! Only PDF file is allowed.');
    }
    this.file = input.files?.item(0);
  }

  openAlertPopup(message: string) {
    this.dialog.open(AlertPopupComponent, {
      minHeight: '180px',
      minWidth: '380px',
      data: { title: 'Alert', message }
    });
  }

  openSuccessPopup(message: string): MatDialogRef<AlertPopupComponent> {
    return this.dialog.open(AlertPopupComponent, {
      minHeight: '180px',
      minWidth: '380px',
      data: { title: 'Success', message }
    });
  }

  onFileDelete() {
    if(this.file) {
      this.file = undefined;
      this.fileInputRef.nativeElement.value = null;
    }
  }



  
  ngOnDestroy():void {
    this.airportDataSubscription.unsubscribe();
  }
}
