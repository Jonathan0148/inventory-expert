import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExpensesComponent } from './detail-expenses.component';

describe('DetailExpensesComponent', () => {
  let component: DetailExpensesComponent;
  let fixture: ComponentFixture<DetailExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
