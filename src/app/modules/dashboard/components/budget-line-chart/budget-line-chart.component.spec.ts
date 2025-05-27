import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetLineChartComponent } from './budget-line-chart.component';

describe('BudgetLineChartComponent', () => {
  let component: BudgetLineChartComponent;
  let fixture: ComponentFixture<BudgetLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetLineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
