import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClubServices } from '../../core/Services/API/ClubServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrl: './club-create.component.css',
})
export class ClubCreateComponent {
  @ViewChild('floatingName') nameLabel!: ElementRef;
  @ViewChild('floatingDescription') descriptionLabel!: ElementRef;
  createClubForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    rising: new FormControl<Date>(new Date()),
  });
  IsClick = false;

  constructor(
    private clubService: ClubServices,
    private router: Router,
  ) {}
  async OnSubmit() {
    this.IsClick = true;
    this.clubService
      .CreateClubCommand({
        name: String(this.createClubForm.value.name),
        description: String(this.createClubForm.value.description),
        rising: this.createClubForm.GetDate('rising'),
      })
      .subscribe({
        next: () => {
          this.IsClick = false;
          this.clubService
            .GetClubIdByName(String(this.createClubForm.value.name))
            .subscribe({
              next: (clubId) => {
                this.router.navigate([`/Club/Details/${clubId}`]);
              },
            });
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
