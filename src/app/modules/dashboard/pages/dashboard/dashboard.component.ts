import { Component, OnInit } from '@angular/core';
import { BudgetPlanDto } from '../../../../services/models';
import { BudgetPlanControllerService } from '../../../../services/services';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit {

  budgets: BudgetPlanDto[] = [];
  selectedBudgetId?: string;

  constructor(private budgetService: BudgetPlanControllerService) {}

  ngOnInit(): void {
    this.budgetService.findAllBudgets({ page: 0, size: 100 }).subscribe(response => {
      this.budgets = response.content ?? [];
    });
  }

  onBudgetChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedBudgetId = value || undefined;
  }

  

}
