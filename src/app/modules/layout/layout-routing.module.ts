import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard'
import { LayoutComponent } from './components/layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'boards',
        pathMatch: 'full'
      },
      {
        path: 'boards',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../boards/boards.module').then((m) => m.BoardsModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
