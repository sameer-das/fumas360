import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightListComponent } from './flight-list/flight-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';

const routes:Routes = [
  {path:'',component:FlightListComponent}
]


@NgModule({
  declarations: [
    FlightListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
})
export class FlightListModule { }
