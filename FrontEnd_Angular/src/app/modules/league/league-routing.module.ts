import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { authActivateGuard } from '../core/guards/auth-activate.guard';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' },
  {
    path: 'Add',
    component: AddComponent,
    canActivate: [authActivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
