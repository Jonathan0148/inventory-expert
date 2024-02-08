import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingDaylingComponent } from './closing-dayling.component';

describe('ClosingDaylingComponent', () => {
  let component: ClosingDaylingComponent;
  let fixture: ComponentFixture<ClosingDaylingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosingDaylingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosingDaylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
