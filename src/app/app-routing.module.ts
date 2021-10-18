import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TempComponent } from './components/temp/temp.component';
import { HomeGuardService } from './shared/guards/home-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    // component:TempComponent,
    component: HomeComponent,
    canActivate:[HomeGuardService],
    children: [
      // {path:'',redirectTo:'dashboard', pathMatch:'full'},
      {path:'', component: DashboardComponent, pathMatch:'full'},
      {
        path: 'flight-list',
        loadChildren: () =>
          import('./modules/flight-list/flight-list.module').then(
            _ => _.FlightListModule
          ),
      },
      {
        path: 'flight-log',
        loadChildren: () =>
          import('./modules/flight-log/flight-log.module').then(
            _ => _.FlightLogModule
          ),
      },
      {
        path: 'airport',
        loadChildren: () =>
          import('./modules/airport/airport.module').then(
            _ => _.AirportModule
          ),
      },      
    ],
  },

  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
