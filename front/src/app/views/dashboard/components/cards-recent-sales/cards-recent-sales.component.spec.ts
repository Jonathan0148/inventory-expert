import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsRecentSalesComponent } from './cards-recent-sales.component';

describe('CardsRecentSalesComponent', () => {
  let component: CardsRecentSalesComponent;
  let fixture: ComponentFixture<CardsRecentSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsRecentSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsRecentSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
