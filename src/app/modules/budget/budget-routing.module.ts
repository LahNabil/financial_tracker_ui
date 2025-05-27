import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BudgetListComponent } from './pages/budget-list/budget-list.component';
import { ManageBudgetComponent } from './pages/manage-budget/manage-budget.component';
import { BudgetTransactionListComponent } from './pages/budget-transaction-list/budget-transaction-list.component';
import { ManageTransactionComponent } from './pages/manage-transaction/manage-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: BudgetListComponent
      },
      {
        path: 'manage',
        component: ManageBudgetComponent
      },
      {
        path: 'manage/:id',
        component: ManageBudgetComponent
      },
      {
        path: 'transactions/:budgetId',
        component: BudgetTransactionListComponent
      },
      {
        path: 'add/transaction/:budgetPlanId',
        component: ManageTransactionComponent
      },
      {
        path: 'manage/transaction/:id',
        component: ManageTransactionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
