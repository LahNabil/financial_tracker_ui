import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { MainComponent } from './pages/main/main.component';
import { BudgetListComponent } from './pages/budget-list/budget-list.component';
import { BudgetCardComponent } from './components/budget-card/budget-card.component';
import { ManageBudgetComponent } from './pages/manage-budget/manage-budget.component';
import { FormsModule } from '@angular/forms';
import { BudgetTransactionListComponent } from './pages/budget-transaction-list/budget-transaction-list.component';
import { ManageTransactionComponent } from './pages/manage-transaction/manage-transaction.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';



@NgModule({
  declarations: [
    MainComponent,
    BudgetListComponent,
    BudgetCardComponent,
    ManageBudgetComponent,
    BudgetTransactionListComponent,
    ManageTransactionComponent,
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    FormsModule,
    SharedModuleModule,
  ],
})
export class BudgetModule { }
