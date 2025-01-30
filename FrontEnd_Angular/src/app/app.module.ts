import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './modules/core/core.module';
import { MatchComponent } from './modules/match/match.component';

@NgModule({
  declarations: [AppComponent, MatchComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
