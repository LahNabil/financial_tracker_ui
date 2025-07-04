import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BudgetListComponent } from './pages/budget-list/budget-list.component';
import { ManageBudgetComponent } from './pages/manage-budget/manage-budget.component';
import { BudgetTransactionListComponent } from './pages/budget-transaction-list/budget-transaction-list.component';
import { ManageTransactionComponent } from './pages/manage-transaction/manage-transaction.component';
import { authGuard } from '../../services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: BudgetListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageBudgetComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:id',
        component: ManageBudgetComponent,
        canActivate: [authGuard]
      },
      {
        path: 'transactions/:budgetId',
        component: BudgetTransactionListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'add/transaction/:budgetPlanId',
        component: ManageTransactionComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/transaction/:id',
        component: ManageTransactionComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
