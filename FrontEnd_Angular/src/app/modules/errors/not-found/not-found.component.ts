import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent implements OnInit, OnDestroy {
  constructor(
    private render: Renderer2,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.render.addClass(document.body, 'customErrorBody');
    this.render.removeClass(document.body, 'normalBgBody');
    this.render.addClass(document.getElementById('appHeader'), 'hidden');
  }

  ngOnDestroy(): void {
    this.render.addClass(document.body, 'normalBgBody');
    this.render.removeClass(document.body, 'customErrorBody');
    this.render.removeClass(document.getElementById('appHeader'), 'hidden');
  }
  ComeBack() {
    this.location.back();
  }
}
