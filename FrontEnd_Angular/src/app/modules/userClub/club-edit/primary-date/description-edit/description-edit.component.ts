import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-description-edit',
  templateUrl: './description-edit.component.html',
  styleUrl: './description-edit.component.css',
})
export class DescriptionEditComponent {
  @Output() closeEmit = new EventEmitter<void>();
  closeModal(): void {
    this.closeEmit.emit();
  }
}
