import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddAirportComponent } from './components/add-airport/add-airport.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ViewPdfComponent } from './popup/view-pdf/view-pdf.component';
import { AirportListComponent } from './components/airport-list/airport-list.component';
import { AddAirportService } from './guards/add-airport.service';
const routes:Routes = [
  {path:'',  component:AirportListComponent},
  {
    path:'add',  
    component:AddAirportComponent,
    resolve: {airportdata: AddAirportService}

}
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
