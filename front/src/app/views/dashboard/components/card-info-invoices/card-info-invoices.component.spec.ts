import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoInvoicesComponent } from './card-info-invoices.component';

describe('CardInfoInvoicesComponent', () => {
  let component: CardInfoInvoicesComponent;
  let fixture: ComponentFixture<CardInfoInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
