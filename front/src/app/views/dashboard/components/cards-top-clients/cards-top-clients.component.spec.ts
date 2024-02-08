import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTopClientsComponent } from './cards-top-clients.component';

describe('CardsTopClientsComponent', () => {
  let component: CardsTopClientsComponent;
  let fixture: ComponentFixture<CardsTopClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsTopClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsTopClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
