import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserClubService } from '../../core/Services/API/UserClubService';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrl: './club-create.component.css',
  standalone: false,
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
    private userClubService: UserClubService,
    private router: Router,
  ) {}
  async OnSubmit() {
    this.IsClick = true;
    this.userClubService
      .CreateClubCommand({
        name: String(this.formControls.name.value),
        description: String(this.formControls.description.value),
        rising: this.createClubForm.GetDate('rising'),
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          this.IsClick = false;
          this.router.navigate([`/Club/Details/${value}`]);
        },
        error: (err) => {
          this.IsClick = false;
          if (
            err.error.includes(
              'Club_With_This_Name_Is_Already_Exist_CreateClub',
            )
          ) {
            alert('Klub o takiej nazwie już istnieje');
          }
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
