import { Component, OnInit } from '@angular/core';
import { PageResponseTransactionDto } from '../../../../services/models';
import { TransactionControllerService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-budget-transaction-list',
  standalone: false,
  templateUrl: './budget-transaction-list.component.html',
  styleUrl: './budget-transaction-list.component.scss'
})
export class BudgetTransactionListComponent implements OnInit {


  transactionResponse: PageResponseTransactionDto = {};
    page=0;
    size=6;
    pages: any = [];
    message = '';
    budgetId!: string;
    isLoading = false;
  

  constructor(private transactionService: TransactionControllerService, private router: Router,private activatedRoute: ActivatedRoute,){}

  ngOnInit(): void {
    this.budgetId = this.activatedRoute.snapshot.params['budgetId']
    console.log('Budget ID:', this.budgetId);
    this.getAllTransactions();
      
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

  onEdit(arg0: string|undefined) {
    throw new Error('Method not implemented.');
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
