import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/errors/not-found/not-found.component';
import { authCanMatchGuard } from './modules/core/guards/Auth-CanMatch.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'Club',
    loadChildren: () =>
      import('../app/modules/club/club.module').then((m) => m.ClubModule),
    canMatch: [authCanMatchGuard],
  },
  {
    path: 'User',
    loadChildren: () =>
      import('../app/modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'User/Club',
    loadChildren: () =>
      import('../app/modules/userClub/userclub.module').then(
        (m) => m.UserclubModule,
      ),
  },
  {
    path: 'League',
    loadChildren: () =>
      import('../app/modules/league/league.module').then((m) => m.LeagueModule),
  },
  {
    path: 'Matches',
    loadChildren: () =>
      import('../app/modules/match/match.module').then((m) => m.MatchModule),
  },
  { path: '**', component: NotFoundComponent, title: 'Error 404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
