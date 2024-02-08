import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationsSalesComponent } from './observations-sales.component';

describe('ObservationsSalesComponent', () => {
  let component: ObservationsSalesComponent;
  let fixture: ComponentFixture<ObservationsSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationsSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
