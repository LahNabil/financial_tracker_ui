import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'budgets',
    loadChildren: ()=> import('./modules/budget/budget.module').then(m=> m.BudgetModule),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadChildren: ()=> import('./modules/profile/profile.module').then(m=> m.ProfileModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    loadChildren: ()=> import('./modules/dashboard/dashboard.module').then(m=> m.DashboardModule),
    pathMatch: 'full',
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
