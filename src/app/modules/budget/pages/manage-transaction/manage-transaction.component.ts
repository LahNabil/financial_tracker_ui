import { Component, OnInit } from '@angular/core';
import { TransactionDto } from '../../../../services/models';
import { TransactionControllerService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveTransaction$Params } from '../../../../services/fn/transaction-controller/save-transaction';
import { UpdateTransaction$Params } from '../../../../services/fn/transaction-controller/update-transaction';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-transaction',
  standalone: false,
  templateUrl: './manage-transaction.component.html',
  styleUrl: './manage-transaction.component.scss'
})
export class ManageTransactionComponent implements OnInit {

  errorMsg: string[] = [];
  transactionResponse: TransactionDto = {};
  budgetPlanId: string | null = null;
  isEditMode = false;
  

  constructor(
    private transactionService: TransactionControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Get the transaction ID from route parameters (if in edit mode)
    const id = this.activatedRoute.snapshot.params['id'];

    // If there is an ID, fetch the transaction details
    if (id) {
      this.isEditMode = true;
      this.transactionService.getTransactionById({ id }).subscribe({
        next: (res) => {
          // Assuming the response contains a transaction object with a budgetPlanId
          this.transactionResponse = res;

          // Auto-fill the budgetPlanId if needed
          if (!this.transactionResponse.budgetPlanId) {
            const budgetPlanId = this.activatedRoute.snapshot.paramMap.get('budgetPlanId');
            if (budgetPlanId) {
              this.transactionResponse.budgetPlanId = budgetPlanId;
            }
          }
        },
        error: (err) => {
          console.error('Fetch error:', err);
          this.errorMsg = err.error?.validationErrors ?? ['An error occurred while fetching the transaction details.'];
        }
      });
    } else {
      // Handle the case when there is no transaction ID (perhaps for a new transaction)
      const budgetPlanId = this.activatedRoute.snapshot.paramMap.get('budgetPlanId');
      if (budgetPlanId) {
        this.transactionResponse.budgetPlanId = budgetPlanId;
      }
    }
  }

  saveTransaction(): void {
    this.errorMsg = []; // clear previous errors

    // Validate the required fields before submitting
    if (!this.transactionResponse.title?.trim() ||
        !this.transactionResponse.amount ||
        !this.transactionResponse.date?.trim() ||
        !this.transactionResponse.budgetPlanId) {
      this.errorMsg.push('All required fields must be filled out.');
      return;
    }

    // Check if we are in edit mode and update the transaction
    if (this.isEditMode && this.transactionResponse.id != null) {
      const params: UpdateTransaction$Params = {
        id: String(this.transactionResponse.id),
        body: {
          id: this.transactionResponse.id!,
          title: this.transactionResponse.title!,
          amount: this.transactionResponse.amount!,
          date: this.transactionResponse.date!,
          budgetPlanId: this.transactionResponse.budgetPlanId!,
          category: this.transactionResponse.category || 'OTHER',
          status: this.transactionResponse.status || 'REAL',
          type: this.transactionResponse.type || 'INCOME'
        }
      };

      this.transactionService.updateTransaction(params).subscribe({
        next: (res) => {
          console.log('Transaction updated successfully', res);
          this.goBack();
        },
        error: (err) => {
          console.error('Update error:', err);
          this.errorMsg = err.error?.validationErrors ?? ['An error occurred while updating the transaction.'];
        }
      });
    } else {
      // If it's a new transaction, save it
      const params: SaveTransaction$Params = {
        body: this.transactionResponse,
        budgetPlanId: this.transactionResponse.budgetPlanId || ''
      };

      this.transactionService.saveTransaction(params).subscribe({
        next: (res) => {
          console.log('Transaction added successfully', res);
          this.goBack();
        },
        error: (err) => {
          console.error('Save error:', err);
          this.errorMsg = err.error?.validationErrors ?? ['An error occurred while saving the transaction.'];
        }
      });
    }
  }
  goBack() {
    this.location.back();
  }
}
