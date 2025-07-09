import {
  Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges
} from '@angular/core';
import {
  ChartConfiguration, ChartType
} from 'chart.js';
import {
  DashboardControllerService
} from '../../../../services/services';
import {
  TransactionDto, TransactionComparisonDto
} from '../../../../services/models';
import {
  BaseChartDirective
} from 'ng2-charts';

@Component({
  selector: 'app-budget-line-chart',
  standalone: false,
  templateUrl: './budget-line-chart.component.html',
  styleUrls: ['./budget-line-chart.component.scss']
})
export class BudgetLineChartComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() budgetId?: string;

  public hasData: boolean = true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [],
    labels: []
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'MAD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  public lineChartType: 'line' = 'line';

  constructor(private dashboardService: DashboardControllerService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['budgetId']) {
      this.fetchData();
    }
  }

  fetchData(): void {
    const params = this.budgetId ? { budgetId: this.budgetId } : {};
    this.dashboardService.getTransactionComparison(params).subscribe({
      next: (data: TransactionComparisonDto) => {
        this.prepareChartData(data);
      },
      error: (err) => {
        console.error('Failed to load comparison data', err);
        this.hasData = false;
      }
    });
  }

  private prepareChartData(data: TransactionComparisonDto): void {
    const real = this.processTransactions(data.realTransactions || []);
    const expected = this.processTransactions(data.expectedTransactions || []);

    const allDates = [...new Set([
      ...real.dates,
      ...expected.dates
    ])].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    this.hasData = real.total > 0 || expected.total > 0;
    if (!this.hasData) return;

    this.lineChartData = {
      labels: allDates,
      datasets: [
        {
          label: 'Real Transactions',
          data: allDates.map(date => real.amountsByDate[date] || 0),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
          fill: false
        },
        {
          label: 'Expected Transactions',
          data: allDates.map(date => expected.amountsByDate[date] || 0),
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderDash: [5, 5],
          tension: 0.1,
          fill: false
        }
      ]
    };

    this.chart?.update();
  }

  private processTransactions(transactions: TransactionDto[]) {
    const amountsByDate: { [key: string]: number } = {};
    const dates: string[] = [];
    let total = 0;

    transactions.forEach(t => {
      const dateStr = t.date?.split('T')[0] ?? 'unknown-date';
      const amount = t.amount ?? 0;
      amountsByDate[dateStr] = (amountsByDate[dateStr] || 0) + amount;
      if (!dates.includes(dateStr)) dates.push(dateStr);
      total += amount;
    });

    return { amountsByDate, dates, total };
  }
}
