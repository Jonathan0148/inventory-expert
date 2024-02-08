import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalesClientsComponent } from './list-sales-clients.component';

describe('ListSalesClientsComponent', () => {
  let component: ListSalesClientsComponent;
  let fixture: ComponentFixture<ListSalesClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSalesClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSalesClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
