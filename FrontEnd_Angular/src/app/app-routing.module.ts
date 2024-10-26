import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home',component: HomeComponent,title : "Home"},
  {path:'login',component: LoginComponent,title:"Logowanie"},
  {path:'**',component: NotFound404Component, title:"Error"}
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
