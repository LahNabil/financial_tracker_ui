import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BudgetListComponent } from './pages/budget-list/budget-list.component';
import { BudgetCardComponent } from './components/budget-card/budget-card.component';
import { ManageBudgetComponent } from './pages/manage-budget/manage-budget.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    BudgetListComponent,
    BudgetCardComponent,
    ManageBudgetComponent,
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    FormsModule
  ],
})
export class BudgetModule { }
