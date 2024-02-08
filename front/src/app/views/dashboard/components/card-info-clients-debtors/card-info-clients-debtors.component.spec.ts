import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoClientsDebtorsComponent } from './card-info-clients-debtors.component';

describe('CardInfoClientsDebtorsComponent', () => {
  let component: CardInfoClientsDebtorsComponent;
  let fixture: ComponentFixture<CardInfoClientsDebtorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoClientsDebtorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoClientsDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
