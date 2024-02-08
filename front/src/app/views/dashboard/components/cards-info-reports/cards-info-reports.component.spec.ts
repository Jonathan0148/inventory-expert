import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsInfoReportsComponent } from './cards-info-reports.component';

describe('CardsInfoReportsComponent', () => {
  let component: CardsInfoReportsComponent;
  let fixture: ComponentFixture<CardsInfoReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsInfoReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsInfoReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
