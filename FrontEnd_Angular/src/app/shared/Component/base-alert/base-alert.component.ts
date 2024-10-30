import { Component, Input } from '@angular/core';
import { BaseAlert } from './BaseAlertInterface';

@Component({
  selector: 'app-base-alert',
  templateUrl: './base-alert.component.html',
  styleUrl: './base-alert.component.css'
})
export class BaseAlertComponent {
  @Input() baseAlert!:BaseAlert;

  CloseModal(){
    document.getElementById("BaseModal")?.remove();
  }
}
