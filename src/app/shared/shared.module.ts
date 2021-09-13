import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [AlertPopupComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[AlertPopupComponent,MaterialModule]
})
export class SharedModule { }
