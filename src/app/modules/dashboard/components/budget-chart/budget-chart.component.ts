
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardControllerService } from '../../../../services/services';
import { DashboardResponseDto } from '../../../../services/models';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-budget-chart',
  standalone: false,
  templateUrl: './budget-chart.component.html',
  styleUrl: './budget-chart.component.scss'
})
export class BudgetChartComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() budgetId?: string;
  public hasData: boolean = true;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: []
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private dashboardService: DashboardControllerService) {}

  ngOnInit(): void {
    this.fetchData();
  }
  ngOnChanges(): void {
    this.fetchData();
  }
  fetchData(): void {
  const params = this.budgetId ? { budgetId: this.budgetId } : {};
  this.dashboardService.getDashboard(params).subscribe((data: DashboardResponseDto) => {
    const labels = data.expensesByCategory?.map(e => e.category ?? 'Unknown') ?? [];
    const values = data.expensesByCategory?.map(e => e.total ?? 0) ?? [];

    this.hasData = values.some(value => value > 0);

    if (!this.hasData) {
      return; 
    }

    const generatedColors = this.generateColors(labels.length);

    this.doughnutChartData.labels = labels;
    this.doughnutChartData.datasets[0].data = values;
    this.doughnutChartData.datasets[0].backgroundColor = generatedColors;

    this.chart?.update();
  });
}

  generateColors(count: number): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i);
    colors.push(`hsl(${hue}, 70%, 60%)`); // 💡 Pastel unique colors
  }
  return colors;
}


 
  

  
}

