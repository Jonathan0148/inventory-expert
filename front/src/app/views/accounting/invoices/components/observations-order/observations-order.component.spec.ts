import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationsOrderComponent } from './observations-order.component';

describe('ObservationsOrderComponent', () => {
  let component: ObservationsOrderComponent;
  let fixture: ComponentFixture<ObservationsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationsOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
