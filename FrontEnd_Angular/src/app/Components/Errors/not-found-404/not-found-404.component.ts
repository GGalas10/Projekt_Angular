import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found-404',
  templateUrl: './not-found-404.component.html',
  styleUrl: './not-found-404.component.css'
})
export class NotFound404Component implements OnInit,OnDestroy {
  constructor(private render:Renderer2,private location:Location){}
  

  ngOnInit(): void {
    this.render.addClass(document.body,"customErrorBody");
    this.render.removeClass(document.body,"normalBgBody");
    this.render.addClass(document.getElementById("appHeader"),"hidden");
  }

  ngOnDestroy(): void {
    this.render.addClass(document.body,"normalBgBody");
    this.render.removeClass(document.body,"customErrorBody");
    this.render.removeClass(document.getElementById("appHeader"),"hidden");
  }
  ComeBack(){
    this.location.back();
  }
}
