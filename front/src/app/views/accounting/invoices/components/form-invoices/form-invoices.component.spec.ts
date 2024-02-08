import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInvoicesComponent } from './form-invoices.component';

describe('FormInvoicesComponent', () => {
  let component: FormInvoicesComponent;
  let fixture: ComponentFixture<FormInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
