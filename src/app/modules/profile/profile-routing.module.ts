import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../services/guard/auth.guard';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
          {
            path: '',
            component: ProfileComponent,
            canActivate: [authGuard]
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
            canActivate: [authGuard]
          },
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
