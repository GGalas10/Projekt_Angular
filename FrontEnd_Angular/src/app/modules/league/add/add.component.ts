import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: false,
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  createLeague = new FormGroup({
    name: new FormControl(''),
    startDate: new FormControl<Date>(new Date()),
    endDate: new FormControl<Date>(new Date()),
  });
  get formControls() {
    return this.createLeague.controls;
  }
  OnSubmit() {
    console.log('test');
  }
}
