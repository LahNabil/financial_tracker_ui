import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { BudgetPlanControllerService } from '../../../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-line-chart',
  standalone: false,
  templateUrl: './budget-line-chart.component.html',
  styleUrls: ['./budget-line-chart.component.scss']
})
export class BudgetLineChartComponent implements OnInit {
  lineChart!: Chart;
  loading = true;
  error = false;

  constructor(
    private budgetPlanService: BudgetPlanControllerService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBudgetData();
  }

  loadBudgetData(): void {
    this.budgetPlanService.getCurrentMonthBudgetWithTransactions$Response().subscribe({
      next: (response) => {
        const data = response.body;
        if (data) {
          this.initializeChart(data);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading budget data:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  initializeChart(data: any): void {
    const daysInMonth = new Date(data.budgetPlan.year, data.budgetPlan.month, 0).getDate();
    const dates = Array.from({length: daysInMonth}, (_, i) => (i + 1).toString());
    
    // Initialize both series with 0 on day 0
    const initialIncome = data.budgetPlan.initialIncome || 0;
    
    // Process planned budget (expected transactions)
    const plannedBudget = this.calculateBudgetFlow(
      initialIncome,
      data.expectedTransactions,
      daysInMonth
    );
    
    // Process actual transactions
    const actualTransactions = this.calculateBudgetFlow(
      initialIncome,
      data.realTransactions,
      daysInMonth
    );
    
    // Calculate min/max values for yAxis
    const allValues = [...plannedBudget, ...actualTransactions];
    const minY = Math.min(0, ...allValues);
    const maxY = Math.max(initialIncome, ...allValues);

    this.lineChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: `Budget Flow for ${this.getMonthName(data.budgetPlan.month)} ${data.budgetPlan.year}`
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: ['Start', ...dates], // Added 'Start' for day 0
        title: {
          text: 'Day of Month'
        }
      },
      yAxis: {
        title: {
          text: 'Amount (€)'
        },
        min: minY,
        max: maxY,
        labels: {
          formatter: function() {
            return '€' + this.value;
          }
        }
      },
      tooltip: {
        pointFormat: '<b>€{point.y:,.2f}</b>',
        valueDecimals: 2
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true
          }
        }
      },
      series: [
        {
          type: 'line',
          name: 'Planned Budget',
          data: plannedBudget,
          color: '#0000FF',  // blue line
          dashStyle: 'Dash'
        },
        {
          type: 'line',
          name: 'Actual Balance',
          data: actualTransactions,
          color: '#FF0000'  // red line
        }
      ]
    });
  }

  private calculateBudgetFlow(initialAmount: number, transactions: number[], daysInMonth: number): number[] {
    // Start with initial amount on day 0
    const flow = [initialAmount];
    let currentAmount = initialAmount;
    
    // Distribute transactions across the month
    // This is simplified - you should ideally have dates for each transaction
    const transactionsPerDay = Math.max(1, Math.floor(transactions.length / daysInMonth));
    
    for (let day = 1; day <= daysInMonth; day++) {
      // Get transactions for this day (simplified distribution)
      const dayTransactions = transactions.slice(
        (day-1) * transactionsPerDay,
        day * transactionsPerDay
      );
      
      // Apply transactions
      dayTransactions.forEach(amount => {
        currentAmount += amount;
      });
      
      flow.push(currentAmount);
    }
    
    return flow;
  }

  private getMonthName(monthNumber: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  }
}