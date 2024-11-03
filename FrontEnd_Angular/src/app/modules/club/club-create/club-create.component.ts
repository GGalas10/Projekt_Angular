import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClubServices } from '../../core/Services/API/ClubServices';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrl: './club-create.component.css',
})
export class ClubCreateComponent {
  @ViewChild('floatingName') nameLabel!: ElementRef;
  @ViewChild('floatingDescription') descriptionLabel!: ElementRef;
  createClubForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(10),
      Validators.required,
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [Validators.maxLength(255)]),
    rising: new FormControl<Date>(new Date(), [Validators.required]),
  });
  IsClick = false;
  get formControls() {
    return this.createClubForm.controls;
  }
  constructor(
    private clubService: ClubServices,
    private router: Router,
  ) {}
  async OnSubmit() {
    this.IsClick = true;
    this.clubService
      .CreateClubCommand({
        name: String(this.formControls.name),
        description: String(this.formControls.description),
        rising: this.createClubForm.GetDate('rising'),
      })
      .pipe(
        switchMap(() =>
          this.clubService.GetClubIdByName(String(this.formControls.name)),
        ),
      )
      .subscribe({
        next: (value) => {
          this.IsClick = false;
          this.router.navigate([`/Club/Details/${value}`]);
        },
        error: (err) => {
          this.IsClick = false;
          console.log(err);
        },
      });
  }
  onFocus(Id: string) {
    if (Id == 'name') {
      this.nameLabel.nativeElement.style.bottom = '57px';
      this.nameLabel.nativeElement.style.fontSize = '1rem';
    }
    if (Id == 'desc') {
      this.descriptionLabel.nativeElement.style.bottom = '5px';
      this.descriptionLabel.nativeElement.style.fontSize = '1rem';
    }
  }
  onBlur(Id: string) {
    if (Id == 'name') {
      if (this.createClubForm.value.name != '') {
        return;
      }
      this.nameLabel.nativeElement.style.bottom = '27px';
      this.nameLabel.nativeElement.style.fontSize = '1.2rem';
    }
    if (Id == 'desc') {
      if (this.createClubForm.value.description != '') {
        return;
      }
      this.descriptionLabel.nativeElement.style.bottom = '-27px';
      this.descriptionLabel.nativeElement.style.fontSize = '1.2rem';
    }
  }
}
