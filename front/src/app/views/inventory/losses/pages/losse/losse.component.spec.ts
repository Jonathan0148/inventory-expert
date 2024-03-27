import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosseComponent } from './losse.component';

describe('LosseComponent', () => {
  let component: LosseComponent;
  let fixture: ComponentFixture<LosseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LosseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LosseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
