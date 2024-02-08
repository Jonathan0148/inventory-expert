import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRevenuesComponent } from './card-revenues.component';

describe('CardRevenuesComponent', () => {
  let component: CardRevenuesComponent;
  let fixture: ComponentFixture<CardRevenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRevenuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
