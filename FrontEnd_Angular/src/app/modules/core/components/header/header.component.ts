import { Component } from '@angular/core';
import { AppModule } from '../../../../app.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLogin = false;
  constructor(private module: AppModule) {
    this.isLogin = this.module.IsLogin;
  }
}
