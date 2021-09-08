import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightListComponent } from './flight-list/flight-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DropdownDataResolver, FlightListResolverService } from './guards/flight-list-resolver.service';
import { FlightListService } from './services/flight-list.service';
import {MultiSelectModule} from 'primeng/multiselect';


const routes:Routes = [
  {path:'',
  resolve: {flightdata: FlightListResolverService, dropdowndata : DropdownDataResolver},  
  component:FlightListComponent}
]


@NgModule({
  declarations: [
    FlightListComponent
  ],
  imports: [
    CommonModule,
    MultiSelectModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [FlightListResolverService,DropdownDataResolver, FlightListService]
})
export class FlightListModule { }
