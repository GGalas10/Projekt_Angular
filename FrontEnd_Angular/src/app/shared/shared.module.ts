import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseAlertComponent } from './Component/base-alert/base-alert.component';
import { LoadingPageComponent } from './Component/loading-page/loading-page.component';

@NgModule({
  declarations: [BaseAlertComponent, LoadingPageComponent],
  imports: [CommonModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BaseAlertComponent,
    LoadingPageComponent,
  ],
})
export class SharedModule {}
