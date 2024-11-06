import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/Services/API/LoginService';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  userName!: string;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService
      .DetailsUser()
      .subscribe({ next: (value) => (this.userName = value.name) });
  }
}
