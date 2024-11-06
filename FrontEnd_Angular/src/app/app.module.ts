import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './shared/Component/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './modules/core/core.module';
import { HealthCheckService } from './modules/core/Services/API/HealthCheckService';

@NgModule({
  declarations: [AppComponent, ModalComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private _service: HealthCheckService) {}
}
