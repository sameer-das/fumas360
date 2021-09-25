import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirportListComponent } from './airport-list/airport-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AddAirportComponent } from './add-airport/add-airport.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ViewPdfComponent } from './popup/view-pdf/view-pdf.component';
const routes:Routes = [
  {path:'',  component:AirportListComponent},
  {path:'add',  component:AddAirportComponent}
]

@NgModule({
  declarations: [
    AirportListComponent,
    AddAirportComponent,
    ViewPdfComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AirportModule { }
