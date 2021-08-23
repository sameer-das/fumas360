import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlightLogComponent } from './flight-log/flight-log.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


const routes:Routes = [
  {path:'',component:FlightLogComponent}
]
@NgModule({
  declarations: [
    FlightLogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class FlightLogModule { }
