import { Component, OnInit } from '@angular/core';
import { BudgetPlanControllerService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BudgetPlanDto, PageResponseBudgetPlanDto } from '../../../../services/models';
import { DeleteBudgetPlan$Params } from '../../../../services/fn/budget-plan-controller/delete-budget-plan';

@Component({
  selector: 'app-budget-list',
  standalone: false,
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})

export class BudgetListComponent implements OnInit {


  budgetResponse: PageResponseBudgetPlanDto = {};
  page=0;
  size=3;
  pages: any = [];
  message = '';


  constructor(private budgetPlanService: BudgetPlanControllerService, private router: Router){}

  ngOnInit(): void {
    this.findAllBudgets();
  }
  private findAllBudgets(){
    this.budgetPlanService.findAllBudgets({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (budgets)=>{
        this.budgetResponse = budgets;
        console.log(budgets)
      }
    })
  }
  deleteBudgetPlan(budget: BudgetPlanDto): void {
  if (confirm(`Are you sure you want to delete the budget for ${budget.month}/${budget.year}?`)) {
    // Ensure that budget.id is defined
    if (budget.id === undefined) {
      alert('Invalid budget ID.');
      return;
    }

    const params: DeleteBudgetPlan$Params = { id: budget.id };

    this.budgetPlanService.deleteBudgetPlan(params).subscribe({
      next: () => {
        alert('Budget plan deleted successfully.');
        window.location.reload();  // Optional: reload or update the UI accordingly
      },
      error: () => {
        alert('Failed to delete the budget plan.');
      }
    });
  }
}

  detailsBudgetPlan(budget: BudgetPlanDto) {
    this.router.navigate(['budgets','transactions',budget.id])
  }
  editBudgetPlan(budget: BudgetPlanDto) {
  if (budget.id) {
    this.router.navigate(['budgets','manage', budget.id]);  // This will trigger /manage/:id
  } else {
    console.error('Invalid budget object or missing budget ID');
  }
}

  goToFirstPage() {
    this.page = 0;
    this.findAllBudgets();

  }
  goToPreviousPage() {
    this.page--;
    this.findAllBudgets();

  }
  goToPage(index: number) {
    this.page = index;
    this.findAllBudgets();

  }
   goToNextPage() {
    this.page ++;
    this.findAllBudgets();

  }
  goToLastPage() {
    this.page = this.budgetResponse.totalPages as number - 1;
    this.findAllBudgets();

  }
   isLastPage() {
    return this.page == this.budgetResponse.totalPages as number - 1;
  }

}
