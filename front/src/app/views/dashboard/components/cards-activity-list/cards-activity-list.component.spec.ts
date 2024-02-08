import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsActivityListComponent } from './cards-activity-list.component';

describe('CardsActivityListComponent', () => {
  let component: CardsActivityListComponent;
  let fixture: ComponentFixture<CardsActivityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsActivityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
