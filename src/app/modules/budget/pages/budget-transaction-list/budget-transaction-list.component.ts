import { Component, OnInit } from '@angular/core';
import { BudgetPlanDto, PageResponseTransactionDto, TransactionDto, UpdateTransactionDto } from '../../../../services/models';
import { BudgetPlanControllerService, TransactionControllerService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-transaction-list',
  standalone: false,
  templateUrl: './budget-transaction-list.component.html',
  styleUrl: './budget-transaction-list.component.scss'
})
export class BudgetTransactionListComponent implements OnInit {


  transaction: TransactionDto = {};
  transactionResponse: PageResponseTransactionDto = {};
    page=0;
    size=6;
    pages: any = [];
    message = '';
    budgetId!: string;
    isLoading = false;
    budget: BudgetPlanDto = {};
    totalIncome: number = 0;
    totalExpense: number = 0;
    remainingBudget: number = 0;
  

  constructor(private budgetPlanService: BudgetPlanControllerService,private transactionService: TransactionControllerService, private router: Router,private activatedRoute: ActivatedRoute,){}

  ngOnInit(): void {
    this.budgetId = this.activatedRoute.snapshot.params['budgetId']
    console.log('Budget ID:', this.budgetId);
    this.getAllTransactions();
    this.getBudgetPlanById();
    this.getTotalIncomes();  // Make sure this is called
    this.getTotalExpenses();
    this.getRemainingBudget();
      
  }
  private getBudgetPlanById(){
    this.budgetPlanService.findBudgetPlanById({ id: this.budgetId }).subscribe({
      next: (res) => {
      this.budget = res;
      },
      error: () => {
        console.error('Failed to fetch budget info');
      }
    });
  }
  
  private getTotalIncomes() {
  this.transactionService.getTotalIncome({ budgetId: this.budgetId }).subscribe({
    next: (income) => {
      this.totalIncome = income;
      console.log('Total Income:', income);
    },
    error: (err) => {
      console.error('Failed to fetch total income', err);
    }
  });
}

private getTotalExpenses() {
  this.transactionService.getTotalExpense({ budgetId: this.budgetId }).subscribe({
    next: (expense) => {
      this.totalExpense = expense;
      console.log('Total Expense:', expense);
    },
    error: (err) => {
      console.error('Failed to fetch total expense', err);
    }
  });
}

private getRemainingBudget() {
  this.transactionService.getRemainingBudget({ budgetId: this.budgetId }).subscribe({
    next: (remainingBudget) => {
      this.remainingBudget = remainingBudget;
      console.log('Remaining Budget:', remainingBudget);
    },
    error: (err) => {
      console.error('Failed to fetch remaining budget', err);
    }
  });
}
  private getAllTransactions(){
    this.transactionService.findAllTransactionsByBudget({
      budgetId: this.budgetId,
      page: this.page,
      size: this.size
    }).subscribe({
      next:(res)=>{
        this.transactionResponse = res;
        console.log(res)
      }
    })
  }
  

  deleteTransaction(transaction: any): void {
    if (confirm(`Are you sure you want to delete the transaction: ${transaction.title}?`)) {
      // Ensure the transaction has a valid ID
      if (!transaction.id) {
        alert('Invalid transaction ID.');
        return;
      }

      const params = { id: transaction.id };

      this.transactionService.deleteTransaction(params).subscribe({
        next: () => {
          alert('Transaction deleted successfully.');
          this.getAllTransactions();  // Refresh the transactions list after deletion
        },
        error: () => {
          alert('Failed to delete the transaction.');
        }
      });
    }
  }

  onEdit(transaction: TransactionDto) {
    if (transaction.id) {
    this.router.navigate(['budgets','manage','transaction', transaction.id]);  // This will trigger /manage/:id
  } else {
    console.error('Invalid budget object or missing budget ID');
  }
    
  }

  goToFirstPage() {
    this.page = 0;
    this.getAllTransactions();

  }

  goToPreviousPage() {
    this.page--;
    this.getAllTransactions();

  }

  goToPage(index: number) {
    this.page = index;
    this.getAllTransactions();

  }

  goToNextPage() {
    this.page ++;
    this.getAllTransactions();

  }

  goToLastPage() {
    this.page = this.transactionResponse.totalPages as number - 1;
    this.getAllTransactions();

  }

  isLastPage() {
    return this.page == this.transactionResponse.totalPages as number - 1;
  }


}
