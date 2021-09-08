import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlightLogComponent } from './flight-log/flight-log.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FlightLogService } from './services/flight-log.service';
import { FlightLogResolverService } from './guards/flight-log-resolver.service';



const routes:Routes = [
  {path:'',
  resolve: {flightlist: FlightLogResolverService},
  component:FlightLogComponent}
]
@NgModule({
  declarations: [
    FlightLogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [FlightLogService, FlightLogResolverService]
})
export class FlightLogModule { }
