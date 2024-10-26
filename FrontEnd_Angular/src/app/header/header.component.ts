import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TestObject } from '../shared/Interfaces/ObjecTest';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(){}

  def : string = 'Binding';
  testArray: TestObject[] = [];
  openModal: boolean = false;
  ModalText:string = "";
  ModalTitle:string = "";
  UserAccept:boolean = false;
  TempName:string = "";

  OpenModal(title:string, text:string){
    this.ModalText = text;
    this.ModalTitle = title;
    this.openModal = true;
  }


  async testEventBinding(nazwa:string){
    
    this.TempName = nazwa;
    this.OpenModal("Jestś pewny?","Czy jesteś pewny, że chcesz dodać nowe zadania ?");
  }

  CloseModal(userInfo:boolean){
    if(userInfo){
      const obj : TestObject = {
        Name : this.TempName,
        IsReady : false,
        Id : this.testArray.length.toString(),
        HowMuch : this.testArray.length*2,
      }
      this.testArray.push(obj)
    }
    this.openModal = false;
  }

  changeCheckBox(object:TestObject){
    object.IsReady = !object.IsReady;
    console.log(this.testArray);
  }
}
