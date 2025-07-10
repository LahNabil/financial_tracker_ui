import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { DashboardControllerService } from '../../../../services/services';

@Component({
  selector: 'app-budget-bar-chart',
  standalone: false,
  templateUrl: './budget-bar-chart.component.html',
  styleUrl: './budget-bar-chart.component.scss'
})
export class BudgetBarChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() budgetId?: string;

  public hasData = true;

  public barChartType: ChartType = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount (DH)',
        data: [],
        backgroundColor: ['#3399ff', '#fff748'],
        barThickness: 60
      }
    ]
  };
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private dashboardService: DashboardControllerService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['budgetId']) {
      this.loadChart(); // re-fetch data when budgetId changes
    }
  }

  private loadChart(): void {
    this.dashboardService.getDashboard({ budgetId: this.budgetId }).subscribe(data => {
      const income = data.totalIncome ?? 0;
      const expenses = data.totalExpenses ?? 0;

      if (income === 0 && expenses === 0) {
        this.hasData = false;
        return;
      }

      this.hasData = true;
      this.barChartData.datasets[0].data = [income, expenses];
      this.chart?.update();
    });
  }

}
