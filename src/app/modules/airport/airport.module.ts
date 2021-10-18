import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddAirportComponent } from './components/add-airport/add-airport.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ViewPdfComponent } from './popup/view-pdf/view-pdf.component';
import { AirportListComponent } from './components/airport-list/airport-list.component';
import { AddAirportService } from './guards/add-airport.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AirportStatusComponent } from './components/airport-status/airport-status.component';
import { AirportStatusService } from './guards/airport-status.service';
const routes:Routes = [
  {path:'',  component:AirportListComponent},
  {
    path:'add',  
    component:AddAirportComponent,
    resolve: {airportdata: AddAirportService}
  },
  {
    path: 'airport-status',
    component:AirportStatusComponent,
    resolve: {fileData: AirportStatusService}
  }
]

@NgModule({
  declarations: [
    AirportListComponent,
    AddAirportComponent,
    ViewPdfComponent,
    AirportStatusComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PdfViewerModule,
    RouterModule.forChild(routes)
  ]
})
export class AirportModule { }
