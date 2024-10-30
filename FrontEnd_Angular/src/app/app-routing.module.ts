import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ClubDetailsComponent } from './Components/Club/club-details/club-details.component';
import { LoginComponent } from './Components/User/login/login.component';
import { NotFound404Component } from './Components/Errors/not-found-404/not-found-404.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home',component: HomeComponent,title : "Home"},
  {path:'login',component: LoginComponent,title:"Logowanie"},
  {path:'Club/Details/:clubId',component : ClubDetailsComponent, title: "Szczegóły"},
  {path:'**',component: NotFound404Component, title:"Error 404"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
