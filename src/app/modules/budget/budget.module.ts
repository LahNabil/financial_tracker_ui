import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BudgetListComponent } from './pages/budget-list/budget-list.component';



@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    BudgetListComponent,
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
  ],
})
export class BudgetModule { }
