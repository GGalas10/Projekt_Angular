import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  def : string = 'Binding';
  testEventBinding(nazwa:string){
    alert(nazwa);
  }
}
