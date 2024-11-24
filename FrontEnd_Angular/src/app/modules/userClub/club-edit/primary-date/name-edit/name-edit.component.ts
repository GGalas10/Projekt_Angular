import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-name-edit',
  templateUrl: './name-edit.component.html',
  styleUrl: './name-edit.component.css',
})
export class NameEditComponent {
  @Output() closeEmit = new EventEmitter<void>();
  closeModal(): void {
    this.closeEmit.emit();
  }
}
