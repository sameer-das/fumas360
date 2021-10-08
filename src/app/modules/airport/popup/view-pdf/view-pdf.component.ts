import { Component, Inject, OnInit, Sanitizer } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AirportService } from '../../services/airport.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {

  constructor(private _airportService: AirportService, 
    private _sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  pdfUrl!:SafeResourceUrl;
  showPDF: boolean = false;
  ngOnInit(): void {
    console.log(this.data)
    this._airportService.getPDF(this.data).subscribe((pdfResp: any) => {
      console.log(pdfResp)
      if(pdfResp.code === 200){
        this.pdfUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + pdfResp.data + '#toolbar=0');
        this.showPDF = true;
      }
    })
  }

  

}
