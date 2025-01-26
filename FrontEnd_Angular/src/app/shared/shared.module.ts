import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseAlertComponent } from './Component/base-alert/base-alert.component';
import { LoadingPageComponent } from './Component/loading-page/loading-page.component';
import { ModalComponent } from './Component/modal/modal.component';
@NgModule({
  declarations: [BaseAlertComponent, LoadingPageComponent, ModalComponent],
  imports: [CommonModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BaseAlertComponent,
    LoadingPageComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
