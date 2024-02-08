import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBailsInvoiceComponent } from './detail-bails-invoice.component';

describe('DetailBailsInvoiceComponent', () => {
  let component: DetailBailsInvoiceComponent;
  let fixture: ComponentFixture<DetailBailsInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBailsInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBailsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
