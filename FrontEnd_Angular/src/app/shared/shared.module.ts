import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseAlertComponent } from './Component/base-alert/base-alert.component';

@NgModule({
  declarations: [BaseAlertComponent],
  imports: [CommonModule],
  exports: [CommonModule, ReactiveFormsModule, BaseAlertComponent],
})
export class SharedModule {}
