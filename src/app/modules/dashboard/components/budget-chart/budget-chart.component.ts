
import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-budget-chart',
  standalone: false,
  templateUrl: './budget-chart.component.html',
  styleUrl: './budget-chart.component.scss'
})
export class BudgetChartComponent implements OnInit {
  @Input() monthlyTransactions: { month: string, planned: number, spent: number }[] = [];

  chart!: Chart;

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    const months = this.monthlyTransactions.map(item => item.month);
    const planned = this.monthlyTransactions.map(item => item.planned);
    const spent = this.monthlyTransactions.map(item => item.spent);

    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Budget vs Dépenses par Mois'
      },
      xAxis: {
        categories: months,
        title: {
          text: 'Mois'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Montant (MAD)'
        }
      },
      series: [
        {
          name: 'Prévu',
          data: planned,
          type: 'column',
          color: '#7cb5ec'
        },
        {
          name: 'Dépensé',
          data: spent,
          type: 'column',
          color: '#f45b5b'
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
}

