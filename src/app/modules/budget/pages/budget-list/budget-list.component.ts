import { Component, OnInit } from '@angular/core';
import { BudgetPlanControllerService } from '../../../../services/services';
import { Router } from '@angular/router';
import { PageResponseBudgetPlanDto } from '../../../../services/models';

@Component({
  selector: 'app-budget-list',
  standalone: false,
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent implements OnInit {

  budgetResponse: PageResponseBudgetPlanDto = {};
  page=0;
  size=5;


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

}
