/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

export interface UpdateTransactionDto {
  amount: number;
  budgetPlanId?: string;
  category: 'RENT_MORTGAGE' | 'UTILITIES' | 'GROCERIES' | 'TRANSPORT' | 'INSURANCE' | 'HEALTH' | 'DINING_OUT' | 'ENTERTAINMENT' | 'SHOPPING' | 'TRAVEL' | 'SAVINGS' | 'INVESTMENTS' | 'DEBT' | 'GIFTS' | 'OTHER';
  date?: string;
  description?: string;
  id?: string;
  status: 'REAL' | 'EXPECTED';
  title: string;
  type: 'INCOME' | 'EXPENSE';
}
