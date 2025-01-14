import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-name',
  standalone: false,

  templateUrl: './edit-name.component.html',
  styleUrl: './edit-name.component.css',
})
export class EditNameComponent {
  @Output() closeEvent = new EventEmitter<void>();
}
