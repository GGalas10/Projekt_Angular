import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseAlert } from './BaseAlertInterface';

@Component({
  selector: 'app-base-alert',
  templateUrl: './base-alert.component.html',
  styleUrl: './base-alert.component.css',
  standalone: false,
})
export class BaseAlertComponent {
  @Output() CloseEmit = new EventEmitter<void>();
  @Input() baseAlert!: BaseAlert;

  CloseModal() {
    this.CloseEmit.emit();
  }
}
