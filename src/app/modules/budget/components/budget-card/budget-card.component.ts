import { Component,EventEmitter, Input, Output } from '@angular/core';
import { BudgetPlanDto } from '../../../../services/models';




@Component({
  selector: 'app-budget-card',
  standalone: false,
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.scss'
})
export class BudgetCardComponent {
  private _budget: BudgetPlanDto = {};
  @Output() private edit: EventEmitter<BudgetPlanDto> = new EventEmitter<BudgetPlanDto>();
  @Output() private details: EventEmitter<BudgetPlanDto> = new EventEmitter<BudgetPlanDto>();
  @Output() private delete: EventEmitter<BudgetPlanDto> = new EventEmitter<BudgetPlanDto>();
  
  public get budget(): BudgetPlanDto {
    return this._budget;
  }

  @Input()
  public set budget(value: BudgetPlanDto) {
    this._budget = value;
  }

  onEdit() {
    this.edit.emit(this._budget);

  }
  onDelete(){
    this.delete.emit(this._budget);
  }

  onDetails() {
    this.details.emit(this._budget);
  }
 
  
  
  

}

