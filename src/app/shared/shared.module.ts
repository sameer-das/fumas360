import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';


@NgModule({
  declarations: [AlertPopupComponent, ConfirmPopupComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[AlertPopupComponent,MaterialModule]
})
export class SharedModule { }
