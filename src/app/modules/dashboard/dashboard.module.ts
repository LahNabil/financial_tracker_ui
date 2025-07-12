import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BudgetChartComponent } from './components/budget-chart/budget-chart.component';
import { MainComponent } from './pages/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { BudgetLineChartComponent } from './components/budget-line-chart/budget-line-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { BudgetBarChartComponent } from './components/budget-bar-chart/budget-bar-chart.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [
    BudgetChartComponent,
    MainComponent,
    DashboardComponent,
    BudgetLineChartComponent,
    BudgetBarChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    NgChartsModule,
    SharedModuleModule,
  ]
})
export class DashboardModule { }
