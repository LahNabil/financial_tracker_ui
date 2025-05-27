import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BudgetChartComponent } from './components/budget-chart/budget-chart.component';
import { MainComponent } from './pages/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { BudgetLineChartComponent } from './components/budget-line-chart/budget-line-chart.component';


@NgModule({
  declarations: [
    BudgetChartComponent,
    MainComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    BudgetLineChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule
  ]
})
export class DashboardModule { }
