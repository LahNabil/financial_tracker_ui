import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BudgetListComponent } from './pages/budget-list/budget-list.component';
import { ManageBudgetComponent } from './pages/manage-budget/manage-budget.component';
import { BudgetTransactionListComponent } from './pages/budget-transaction-list/budget-transaction-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'budgets',
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
        path: 'budgets/transactions/:budgetId',
        component: BudgetTransactionListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
