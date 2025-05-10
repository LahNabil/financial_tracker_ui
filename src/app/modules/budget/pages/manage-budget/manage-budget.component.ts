import { Component, OnInit } from '@angular/core';
import { BudgetPlanDto } from '../../../../services/models';
import { BudgetPlanControllerService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveBudgetPlan$Params } from '../../../../services/fn/budget-plan-controller/save-budget-plan';
import { UpdateBudgetPlan$Params } from '../../../../services/fn/budget-plan-controller/update-budget-plan';

@Component({
  selector: 'app-manage-budget',
  standalone: false,
  templateUrl: './manage-budget.component.html',
  styleUrl: './manage-budget.component.scss'
})
export class ManageBudgetComponent implements OnInit {

  errorMsg: Array<string> = [];
  budgetResponse: BudgetPlanDto = {};
  isEditMode: boolean = false;

  constructor(
    private budgetPlanService: BudgetPlanControllerService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.budgetPlanService.findBudgetPlanById({id}).subscribe({
        next: (res) => {
          this.budgetResponse = res;
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors || ['An error occurred while fetching the budget details.'];
        }
      });
    }else {
    this.isEditMode = false;
  }
  }

  saveBudget() {
  if (!this.budgetResponse.initialIncome || !this.budgetResponse.month || !this.budgetResponse.year) {
    this.errorMsg = ['All fields must be filled out.'];
    return;
  }

  if (this.budgetResponse.id) {
    // Update existing budget
    const params: UpdateBudgetPlan$Params = {
      id: this.budgetResponse.id.toString(),  // Use the id for update
      body: this.budgetResponse    // Body with updated data
    };

    this.budgetPlanService.updateBudgetPlan(params).subscribe({
      next: (res: BudgetPlanDto) => {
        console.log('Budget updated successfully', res);
        this.router.navigate(['/budgets']);
      },
      error: (err) => {
        console.error('Error occurred while updating budget:', err);
        this.errorMsg = err.error.validationErrors || ['An error occurred while saving the budget.'];
      }
    });
  } else {
    // Add new budget
    const params: SaveBudgetPlan$Params = {
      body: this.budgetResponse    // Send the budget data for saving
    };

    this.budgetPlanService.saveBudgetPlan(params).subscribe({
      next: (res: string) => {
        console.log('Budget added successfully', res);
        this.router.navigate(['/budgets']);
      },
      error: (err) => {
        console.error('Error occurred while adding budget:', err);
        this.errorMsg = err.error.validationErrors || ['An error occurred while saving the budget.'];
      }
    });
  }
}


}
