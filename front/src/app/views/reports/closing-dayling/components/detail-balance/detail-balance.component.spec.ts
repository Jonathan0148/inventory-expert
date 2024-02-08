import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBalanceComponent } from './detail-balance.component';

describe('DetailBalanceComponent', () => {
  let component: DetailBalanceComponent;
  let fixture: ComponentFixture<DetailBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
