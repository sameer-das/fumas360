import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightListComponent } from './flight-list/flight-list.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownDataResolver, FlightListResolverService } from './guards/flight-list-resolver.service';
import { FlightListService } from './services/flight-list.service';
import { CrewlegSearchDialogComponent } from './popup/crewleg-search-dialog/crewleg-search-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {path:'',
  resolve: {flightdata: FlightListResolverService, dropdowndata : DropdownDataResolver},  
  component:FlightListComponent}
]


@NgModule({
  declarations: [
    FlightListComponent,
    CrewlegSearchDialogComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [FlightListResolverService,DropdownDataResolver, FlightListService]
})
export class FlightListModule { }
